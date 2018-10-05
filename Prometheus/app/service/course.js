'use strict';

const Service = require('egg').Service;

class Course extends Service {
  async list({ offset = 0, limit = 10 }) {
    let resultObj = await this.ctx.model.Course.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      include: [{
          model: this.ctx.model.SpecialColumn,
          attributes: ['name','Id'],
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }],
    });

    const app = this.ctx.app;
    for (let i = 0; i < resultObj.rows.length; i++){
      resultObj.rows[i].thumb = app.signatureUrl(app.getCourseImagePath() + resultObj.rows[i].thumb);
    }

    return resultObj;
  }

  async find(id) {
    const course = await this.ctx.model.Course.findById(id,{
      include: [{
          model: this.ctx.model.SpecialColumn,
          attributes: ['name','Id'],
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }],
    });
    if (!course) {
      this.ctx.throw(404, 'course not found');
    }
    course.thumb = this.ctx.app.signatureUrl(course.thumb);
    return course;
  }

  async create(course) {
    return this.ctx.model.Course.create(course);
  }

  async update({ id, updates }) {
    const course = await this.ctx.model.Course.findById(id);
    if (!course) {
      this.ctx.throw(404, 'course not found');
    }
    return course.update(updates);
  }

  async del(id) {
    const course = await this.ctx.model.Course.findById(id);
    if (!course) {
      this.ctx.throw(404, 'course not found');
    }
    const app =this.ctx.app;
    await app.deleteOssMultiObject([app.getCourseImagePath() + course.thumb,app.getCourseVideoPath() + course.videoAddress]);

    return course.destroy();
  }

  async getCourseBySpecialColumnId({id = 0, limit = 10, offset =0}){
    let resultObj = await this.ctx.model.Course.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }],
      where: {
          specialColumn:id,
      },
    });

    const app = this.ctx.app;
    for (let i = 0; i < resultObj.rows.length; i++){
      resultObj.rows[i].thumb = app.signatureUrl(app.getCourseImagePath() + resultObj.rows[i].thumb);
    }

    return resultObj;
  }

  async getCourseByCourseTypeId({id = 0, limit = 10, offset =0}){
    let resultObj = await this.ctx.model.Course.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
          model: this.ctx.model.SpecialColumn,
          attributes: ['name','Id'],
      }],
      where: {
          courseType:id,
      },
    });

    const app = this.ctx.app;
    for (let i = 0; i < resultObj.rows.length; i++){
      resultObj.rows[i].thumb = app.signatureUrl(app.getCourseImagePath() + resultObj.rows[i].thumb);
    }

    return resultObj;
  }

  async getCourseByCondition({courseType = 0,specialColumn = 0,limit = 10, offset =0}){
    let condition = {
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    };

    if (courseType == 0 && specialColumn == 0){
      condition.include = [{
        model: this.ctx.model.SpecialColumn,
        attributes: ['name','Id'],
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }];
    }
    else if (courseType != 0 && specialColumn == 0){
      condition.include = [{
        model: this.ctx.model.SpecialColumn,
        attributes: ['name','Id'],
      }];
      condition.where = {
        courseType:courseType,
      };
    }
    else if (courseType == 0 && specialColumn != 0){
      condition.include = [{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }];
      condition.where = {
        specialColumn:specialColumn,
      };
    }
    let resultObj = await this.ctx.model.Course.findAndCountAll(condition);

    const app = this.ctx.app;
    for (let i = 0; i < resultObj.rows.length; i++){
      resultObj.rows[i].thumb = app.signatureUrl(app.getCourseImagePath() + resultObj.rows[i].thumb);
    }

    return resultObj;
  }
}

module.exports = Course;

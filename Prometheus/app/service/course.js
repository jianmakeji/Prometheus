'use strict';

const Service = require('egg').Service;

class Course extends Service {
  async list({ offset = 0, limit = 10, thumbName = 'thumb_600_600' }) {
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
    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb, thumbName);
      element.videoAddress = app.signatureUrl(app.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = app.signatureUrl(app.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async find({id = 0,thumbName= 'thumb_600_600'}) {
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
    const app = this.ctx.app;
    course.thumb = app.signatureUrl(app.courseImagePath + course.thumb, thumbName);
    course.videoAddress = app.signatureUrl(app.courseVideoPath + course.videoAddress);
    if(course.qrCode){
      course.qrCode = app.signatureUrl(app.qrCodePath + course.qrCode);
    }
    await this.ctx.model.Course.update({
          lookingNum: this.app.Sequelize.fn('1 + abs', this.app.Sequelize.col('lookingNum'))
        },{
        where: {
          Id: id
        }
    });

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
    const app =this.ctx.app;
    let deleteArray = new Array();
    if (updates.videoAddress != course.videoAddress){
      deleteArray.push(app.courseVideoPath + course.videoAddress);
    }
    if (updates.thumb != course.thumb){
      deleteArray.push(app.courseImagePath + course.thumb);
    }

    if (deleteArray.length > 0){
      await app.deleteOssMultiObject(deleteArray);
    }

    return course.update(updates);
  }

  async del(id) {
    const course = await this.ctx.model.Course.findById(id);
    if (!course) {
      this.ctx.throw(404, 'course not found');
    }
    const app =this.ctx.app;
    await app.deleteOssMultiObject([app.courseImagePath + course.thumb, app.courseVideoPath + course.videoAddress]);

    return course.destroy();
  }

  async getCourseBySpecialColumnId({id = 0, limit = 10, offset =0, thumbName = 'thumb_600_600'}){
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

    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb , thumbName);
      element.videoAddress = app.signatureUrl(app.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = app.signatureUrl(app.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async getCourseByCourseTypeId({id = 0, limit = 10, offset =0, thumbName = 'thumb_600_600'}){
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
    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb, thumbName);
      element.videoAddress = app.signatureUrl(app.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = app.signatureUrl(app.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async getCourseByCondition({courseType = 0,specialColumn = 0,limit = 10, offset =0, thumbName = 'thumb_600_600'}){
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
    else if (courseType != 0 && specialColumn != 0){
      condition.where = {
        courseType:courseType,
        specialColumn:specialColumn,
      };
    }

    let resultObj = await this.ctx.model.Course.findAndCountAll(condition);

    const app = this.ctx.app;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb, thumbName);
      element.videoAddress = app.signatureUrl(app.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = app.signatureUrl(app.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async searchByKeywords({ offset = 0, limit = 10, keyword='', thumbName = 'thumb_600_600' }){
    let resultObj = await this.ctx.model.Course.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
      where: {
          name:{
            [this.app.Sequelize.Op.like]: '%'+keyword+'%',
          },
      },
      include: [{
          model: this.ctx.model.SpecialColumn,
          attributes: ['name','Id'],
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }],
    });

    const app = this.ctx.app;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb, thumbName);
      element.videoAddress = app.signatureUrl(app.courseVideoPath + element.videoAddress);
      if(element.qrCode){
        element.qrCode = app.signatureUrl(app.qrCodePath + element.qrCode);
      }
    });

    return resultObj;
  }

  async updateQRCodeByCourseId(id,qrCode){
    return await this.ctx.model.Course.update({
          qrCode: qrCode
        },{
        where: {
          Id: id
        }
    });
  }

  async findCourseObjById(id){
    const course = await this.ctx.model.Course.findById(id);
    return course;
  }

}

module.exports = Course;

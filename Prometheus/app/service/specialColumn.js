'use strict';

const Service = require('egg').Service;

class SpecialColumn extends Service {
  async list({ offset = 0, limit = 10 }) {
      let resultObj = await this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include: [{
          model: this.ctx.model.Teacher,
          attributes: ['name','Id'],
          as: 'teacher',
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','Id'],
      }],
    });

    const app = this.ctx.app;
    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb);
    });

    return resultObj;
  }

  async find(id) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id,{
      include: [{
          model: this.ctx.model.Teacher,
          attributes: ['name','subject','brief'],
          as: 'teacher',
      },{
        model: this.ctx.model.CourseType,
        attributes: ['name','grade'],
      }],
    });

    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }
    const app = this.ctx.app;
    specialColumn.thumb = this.ctx.app.signatureUrl(app.courseImagePath + specialColumn.thumb);
    return specialColumn;
  }

  async create(specialColumn) {
    return this.ctx.model.SpecialColumn.create(specialColumn);
  }

  async update({ id, updates }) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id);
    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }
    return specialColumn.update(updates);
  }

  async del(id) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id);
    if (!specialColumn) {
      this.ctx.throw(404, 'specialColumn not found');
    }

    const app =this.ctx.app;
    await app.deleteOssObject(app.courseImagePath + specialColumn.thumb);

    return specialColumn.destroy();
  }

  async getSpecialColumnsByTeacherId({id = 0, limit = 10, offset =0}){
    const resultObj =  this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: {
          teacherId:id,
      },
    });

    const app = this.ctx.app;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb);
    });

    return resultObj;
  }

  async getSpecialColumnsByCourseType({courseType = 0}){
    const resultObj =  await this.ctx.model.SpecialColumn.findAll({
      order: [[ 'grade', 'asc' ]],
      where: {
          courseType:courseType,
      },
    });

    const app = this.ctx.app;
    
    resultObj.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.courseImagePath + element.thumb);
    });

    return resultObj;
  }

}

module.exports = SpecialColumn;

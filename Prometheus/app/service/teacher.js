'use strict';

const Service = require('egg').Service;

class Teacher extends Service {
  async list({ offset = 0, limit = 10, thumbName = "thumb_600_600" }) {
    let resultObj = await this.ctx.model.Teacher.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    });

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
        element.avatar = helper.signatureUrl(helper.articleImagePath + element.avatar, thumbName);
    });

    return resultObj;
  }

  async find(id) {
    const teacher = await this.ctx.model.Teacher.findById(id,{
      include:[{
        model:this.ctx.model.SpecialColumn
      }]
    });
    if (!teacher) {
      this.ctx.throw(404, 'teacher not found');
    }

    const helper = this.ctx.helper;
    teacher.avatar = helper.signatureUrl(helper.articleImagePath + teacher.avatar, "undefined");
    return teacher;
  }

  async create(teacher) {
    return this.ctx.model.Teacher.create(teacher);
  }

  async update({ id, updates }) {
    const teacher = await this.ctx.model.Teacher.findById(id);
    if (!teacher) {
      this.ctx.throw(404, 'teacher not found');
    }
    return teacher.update(updates);
  }

  async del(id) {
    const teacher = await this.ctx.model.Teacher.findById(id);
    if (!teacher) {
      this.ctx.throw(404, 'teacher not found');
    }
    return teacher.destroy();
  }
}

module.exports = Teacher;

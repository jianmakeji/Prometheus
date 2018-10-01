'use strict';

const Service = require('egg').Service;

class Teacher extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Teacher.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
    });
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

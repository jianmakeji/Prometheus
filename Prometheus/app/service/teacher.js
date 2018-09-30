'use strict';

const Service = require('egg').Service;

class Teacher extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Teacher.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const teacher = await this.ctx.model.Teacher.findById(id,{
      include: [{
          model: this.ctx.model.SpecialColumn,
<<<<<<< HEAD
          attributes: ['name','thumb','describe','price'],
          as: 'specialColumn',
=======
          as: 'specialColumns',
          attributes: ['name','thumb','describe','price'],
>>>>>>> origin/master
      }],
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

'use strict';

const Service = require('egg').Service;

class Course extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Course.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const course = await this.ctx.model.Course.findById(id);
    if (!course) {
      this.ctx.throw(404, 'course not found');
    }
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
    return course.destroy();
  }
}

module.exports = Course;

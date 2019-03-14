'use strict';

const Service = require('egg').Service;

class CourseType extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.CourseType.getCourseTypeByPage({
      offset,
      limit
    });
  }

  async find(id) {
    const courseType = await this.ctx.model.CourseType.getCourseTypeById(id);
    return courseType;
  }

  async create(courseType) {
    return this.ctx.model.CourseType.create(courseType);
  }

  async update({ id, updates }) {
    const courseType = await this.ctx.model.CourseType.updateCourseType({ id, updates });
    return courseType;
  }

  async del(id) {
    const courseType = await this.ctx.model.CourseType.deleteCourseTypeById(id);
    return courseType;
  }
}

module.exports = CourseType;

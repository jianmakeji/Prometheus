'use strict';

const Service = require('egg').Service;

class CourseType extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.CourseType.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const courseType = await this.ctx.model.CourseType.findById(id,{
      include:[{
        model:this.ctx.model.SpecialColumn
      }]
    });
    if (!courseType) {
      this.ctx.throw(404, 'courseType not found');
    }
    return courseType;
  }

  async create(courseType) {
    return this.ctx.model.CourseType.create(courseType);
  }

  async update({ id, updates }) {
    const courseType = await this.ctx.model.CourseType.findById(id);
    if (!courseType) {
      this.ctx.throw(404, 'courseType not found');
    }
    return courseType.update(updates);
  }

  async del(id) {
    const courseType = await this.ctx.model.CourseType.findById(id);
    if (!courseType) {
      this.ctx.throw(404, 'courseType not found');
    }
    return courseType.destroy();
  }
}

module.exports = CourseType;

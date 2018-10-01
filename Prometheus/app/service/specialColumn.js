'use strict';

const Service = require('egg').Service;

class SpecialColumn extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.SpecialColumn.findAndCountAll({
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
    return specialColumn.destroy();
  }

  async getSpecialColumnsByTeacherId({id = 0, limit = 10, offset =0}){
    return this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: {
          teacherId:id,
      },
    });
  }
}

module.exports = SpecialColumn;

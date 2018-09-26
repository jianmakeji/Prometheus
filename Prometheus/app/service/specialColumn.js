'use strict';

const Service = require('egg').Service;

class SpecialColumn extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.SpecialColumn.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const specialColumn = await this.ctx.model.SpecialColumn.findById(id);
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
}

module.exports = SpecialColumn;

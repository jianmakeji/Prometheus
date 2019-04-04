'use strict';

const Service = require('egg').Service;

class UserSpColumns extends Service {

  async create(userSpColumns) {
    return this.ctx.model.UserSpColumns.createUserSpColumns(userSpColumns);
  }

  async getDataByUserId(userId) {
    const userSpColumns = await this.ctx.model.UserSpColumns.getDataByUserId(userId);

  }

}

module.exports = UserSpColumns;

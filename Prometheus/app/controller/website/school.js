'use strict';

const Controller = require('egg').Controller;

class SchoolController extends Controller {
  async downloadByCondition() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      thumbName: ctx.query.thumbName,
    };

    ctx.body = await ctx.service.school.list(query);
  }
}

module.exports = SchoolController;

'use strict';

const Controller = require('egg').Controller;

class EliteSchoolController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.eliteSchool.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.eliteSchool.find(ctx.helper.parseInt(ctx.params.id));
  }

}

module.exports = EliteSchoolController;

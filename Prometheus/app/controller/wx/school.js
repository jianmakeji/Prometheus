'use strict';

const Controller = require('egg').Controller;

class SchoolController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      thumbName: ctx.query.thumbName,
    };
    
    ctx.body = await ctx.service.school.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.school.find(ctx.helper.parseInt(ctx.params.id));
  }


}

module.exports = SchoolController;

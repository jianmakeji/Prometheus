'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.teacher.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.teacher.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const teacher = await ctx.service.teacher.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }
  }

}

module.exports = TeacherController;

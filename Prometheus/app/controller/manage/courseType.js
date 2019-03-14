'use strict';

const Controller = require('egg').Controller;

class CourseTypeController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };

    ctx.body = await ctx.service.courseType.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.courseType.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const courseType = await ctx.service.courseType.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
        ctx.body = ctx.helper.failure(e.message);
    }

  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      grade: ctx.request.body.grade,
      describe: ctx.request.body.describe,
    };

    try{
      await ctx.service.courseType.update({ id, updates });
      ctx.body = ctx.helper.success('更新成功!');
    }
    catch(e){
        ctx.body = ctx.helper.failure(e.message);
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);

    try{
      await ctx.service.courseType.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
        ctx.body = ctx.helper.failure(e.message);
    }
  }
}

module.exports = CourseTypeController;

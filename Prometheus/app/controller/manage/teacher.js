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

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      subject: ctx.request.body.subject,
      brief: ctx.request.body.brief,
      avatar: ctx.request.body.avatar
    };
    try{
      await ctx.service.teacher.update({ id, updates });
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
      await ctx.service.teacher.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }
}

module.exports = TeacherController;

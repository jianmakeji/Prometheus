'use strict';

const Controller = require('egg').Controller;

class SchoolController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.school.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.school.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const comment = await ctx.service.school.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async update(){
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      name: ctx.request.body.name,
      bg: ctx.request.body.bg
    };
    try{
      await ctx.service.school.updateSchool({ id, updates });
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
      await ctx.service.school.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }
}

module.exports = SchoolController;

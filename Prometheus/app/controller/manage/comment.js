'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      category: ctx.helper.parseInt(ctx.query.category),
    };
    ctx.body = await ctx.service.comment.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.comment.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      const comment = await ctx.service.comment.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    try{
      await ctx.service.comment.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }
}

module.exports = CommentController;

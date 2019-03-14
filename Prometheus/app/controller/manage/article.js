'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
    };
    ctx.body = await ctx.service.article.list(query);
  }

  async show() {
    const ctx = this.ctx;
    try{
      ctx.body = await ctx.service.article.find({id:ctx.helper.parseInt(ctx.params.id)});
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }
  }

  async create() {
    const ctx = this.ctx;
    try{
      const article = await ctx.service.article.create(ctx.request.body);
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
      abstractContent: ctx.request.body.abstractContent,
      mainContent: ctx.request.body.mainContent,
      thumb: ctx.request.body.thumb,
    };

    try{
      await ctx.service.article.update({ id, updates });
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
      await ctx.service.article.del(id);
      ctx.body = ctx.helper.success('删除成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }
  }
}

module.exports = ArticleController;

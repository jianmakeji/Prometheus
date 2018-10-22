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
    ctx.body = await ctx.service.article.find({id:ctx.helper.parseInt(ctx.params.id)});
  }

  async create() {
    const ctx = this.ctx;
    const article = await ctx.service.article.create(ctx.request.body);
    ctx.body = ctx.app.success('创建成功!');
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
    await ctx.service.article.update({ id, updates });
    ctx.body = ctx.app.success('更新成功!');
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.article.del(id);
    ctx.body = ctx.app.success('删除成功!');
  }
}

module.exports = ArticleController;

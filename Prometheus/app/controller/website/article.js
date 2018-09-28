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
    ctx.body = await ctx.service.article.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const article = await ctx.service.article.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = article;
  }

  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    const updates = {
      title: ctx.request.body.title,
      content: ctx.request.body.content,
    };
    ctx.body = await ctx.service.article.update({ id, updates });
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.article.del(id);
    ctx.status = 200;
  }
}

module.exports = ArticleController;

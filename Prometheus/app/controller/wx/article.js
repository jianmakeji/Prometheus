'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      thumbName:ctx.query.thumbName,
    };
    ctx.body = await ctx.service.article.list(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.article.find({id:ctx.helper.parseInt(ctx.params.id)});
  }

}

module.exports = ArticleController;

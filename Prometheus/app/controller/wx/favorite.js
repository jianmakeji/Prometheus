'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      category: ctx.helper.parseInt(ctx.query.category),
      userId: ctx.helper.parseInt(ctx.query.userId),
    };
    ctx.body = await ctx.service.favorite.list(query);
  }

  async create() {
    const ctx = this.ctx;

    const favorite = {
      userId: ctx.request.body.userId,
      category: ctx.request.body.category,
      courseId: ctx.request.body.courseId,
      articleId: ctx.request.body.articleId,
    };
    await ctx.service.favorite.create(favorite);
    ctx.body = ctx.app.success('收藏成功!');
  }

  async destroy() {
    const ctx = this.ctx;
    const id = ctx.helper.parseInt(ctx.params.id);
    await ctx.service.favorite.del(id);
    ctx.body = ctx.app.success('删除成功!');
  }
}

module.exports = FavoriteController;

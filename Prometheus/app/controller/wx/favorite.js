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
      thumbName:ctx.query.thumbName,
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

  async deleteFavorite() {
    const ctx = this.ctx;
    const favorite = {
      userId: ctx.query.userId,
      category: ctx.query.category,
      courseId: ctx.query.courseId,
      articleId: ctx.query.articleId,
    };

    await ctx.service.favorite.del(favorite);
    ctx.body = ctx.app.success('取消成功!');
  }

  async checkIsFavite(){
    const ctx = this.ctx;

    const favorite = {
      userId: ctx.query.userId,
      category: ctx.query.category,
      courseId: ctx.query.courseId,
      articleId: ctx.query.articleId,
    };
    const favObj = await ctx.service.favorite.findFavByCategory(favorite);

    if (Object.keys(favObj).length > 0) {
      ctx.body = ctx.app.success('已收藏');
    }
    else{
      ctx.body = ctx.app.success('未收藏');
    }
  }

}

module.exports = FavoriteController;

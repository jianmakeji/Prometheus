'use strict';

const Controller = require('egg').Controller;

class FavoriteController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      category: ctx.helper.parseInt(ctx.query.category),
      userId: ctx.helper.parseInt(ctx.query.userId)
    };
    ctx.body = await ctx.service.favorite.list(query);
  }

  async create() {
    const ctx = this.ctx;

    const favorite = {
      userId: ctx.request.body.userId,
      category: ctx.request.body.category,
      specialCourseId: ctx.request.body.specialCourseId,
      eliteCourseId: ctx.request.body.eliteCourseId,
    };
    try{
      await ctx.service.favorite.create(favorite);
      ctx.body = ctx.helper.success('收藏成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async deleteFavorite() {
    const ctx = this.ctx;
    const favorite = {
      userId: ctx.query.userId,
      category: ctx.query.category,
      specialCourseId: ctx.query.specialCourseId,
      eliteCourseId: ctx.query.eliteCourseId,
    };
    try{
      await ctx.service.favorite.del(favorite);
      ctx.body = ctx.helper.success('取消成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }

  async checkIsFavite(){
    const ctx = this.ctx;

    const favorite = {
      userId: ctx.query.userId,
      category: ctx.query.category,
      specialCourseId: ctx.query.specialCourseId,
      eliteCourseId: ctx.query.eliteCourseId
    };
    const favObj = await ctx.service.favorite.list(favorite);

    if (Object.keys(favObj).length > 0) {
      ctx.body = ctx.helper.success('已收藏');
    }
    else{
      ctx.body = ctx.helper.success('未收藏');
    }
  }

  async getFavoriteByPage(){
    const ctx = this.ctx;
    const favorite = {
      offset: ctx.query.offset,
      limit: ctx.query.limit,
      category: ctx.query.category,
      userId: ctx.query.userId,
      thumbName: ctx.query.thumbName
    };
    const favObj = await ctx.service.favorite.getFavoriteByPage(favorite);
    ctx.body = favObj;
  }

  async findFavByCategory(){
    const ctx = this.ctx;
    const favorite = {
      userId: ctx.query.userId,
      category: ctx.query.category,
      specialCourseId: ctx.query.specialCourseId,
      eliteCourseId: ctx.query.eliteCourseId,
    };
    const favObj = await ctx.service.favorite.findFavByCategory(favorite);
    ctx.body = favObj;
  }
}

module.exports = FavoriteController;

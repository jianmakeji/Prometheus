'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
  async index(){
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      eliteCourseId: ctx.helper.parseInt(ctx.query.eliteCourseId),
      specialCourseId: ctx.helper.parseInt(ctx.query.specialCourseId),
    };
    ctx.body = await ctx.service.comment.getCommentbyPage(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.comment.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    try{
      await ctx.service.comment.create(ctx.request.body);
      ctx.body = ctx.helper.success('创建成功!');
    }
    catch(e){
      ctx.body = ctx.helper.failure(e.message);
    }

  }


  async getCommentByEliteCourseId() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      eliteCourseId: ctx.helper.parseInt(ctx.query.eliteCourseId),
    };
    ctx.body = await ctx.service.comment.getCommentByEliteCourseId(query);
  }

  async getCommentBySpecialCourseId() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      specialCourseId: ctx.helper.parseInt(ctx.query.specialCourseId),
    };
    ctx.body = await ctx.service.comment.getCommentBySpecialCourseId(query);
  }
}

module.exports = CommentController;

'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {

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


  async getCommentByCourseId() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset),
      courseId: ctx.helper.parseInt(ctx.query.courseId),
    };
    ctx.body = await ctx.service.comment.getCommentByCourseId(query);
  }

}

module.exports = CommentController;

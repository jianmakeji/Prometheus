'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.comment.find(ctx.helper.parseInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const comment = await ctx.service.comment.create(ctx.request.body);
    ctx.body = ctx.app.success('创建成功!');
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

'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Comment.getCommentbyPage({
      offset,
      limit,
      });
  }

  async find(id) {
    const comment = await this.ctx.model.Comment.getCommentById(id);
    return comment;
  }

  async create(comment) {
    return this.ctx.model.Comment.createComment(comment);
  }

  async getCommentByCourseId({ offset = 0, limit = 10, courseId = 0}){
    return this.ctx.model.Comment.getCommentByCourseId({offset,limit,courseId});
  }

  async del(id) {
    return await this.ctx.model.Comment.delCommentById(id);
  }
}

module.exports = Comment;

'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async list({ offset = 0, limit = 10, category = 0 }) {
    return this.ctx.model.Comment.getCommentbyPage({
      offset,
      limit,
      category
    });
  }

  async find(id) {
    const comment = await this.ctx.model.Comment.getCommentById(id);
    return comment;
  }

  async create(comment) {
    return this.ctx.model.Comment.createComment(comment);
  }

  async getCommentByEliteCourseId({ offset = 0, limit = 10, eliteCourseId = 0}){
    return this.ctx.model.Comment.getCommentByCourseId({offset,limit,eliteCourseId});
  }

  async getCommentBySpecialCourseId({ offset = 0, limit = 10, specialCourseId = 0}){
    return this.ctx.model.Comment.getCommentByCourseId({offset,limit,specialCourseId});
  }

  async del(id) {
    return await this.ctx.model.Comment.delCommentById(id);
  }
}

module.exports = Comment;

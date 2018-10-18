'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Comment.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'desc' ]],
      include:[{
        model:this.ctx.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
  }

  async find(id) {
    const comment = await this.ctx.model.Comment.findById(id,{
      include:[{
        model:this.ctx.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
    if (!courseType) {
      this.ctx.throw(404, 'comment not found');
    }
    return comment;
  }

  async create(comment) {
    return this.ctx.model.Comment.create(comment);
  }

  async getCommentByCourseId({ offset = 0, limit = 10, courseId = 0}){
    return this.ctx.model.Comment.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: { courseId: courseId },
      include:[{
        model:this.ctx.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
  }

  async del(id) {
    const comment = await this.ctx.model.Comment.findById(id);
    if (!comment) {
      this.ctx.throw(404, 'comment not found');
    }
    return comment.destroy();
  }
}

module.exports = Comment;

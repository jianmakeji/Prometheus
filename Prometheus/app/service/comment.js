'use strict';

const Service = require('egg').Service;

class Comment extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Comment.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      include:[{
        model:this.ctx.model.User
      }]
    });
  }

  async find(id) {
    const courseType = await this.ctx.model.Comment.findById(id,{
      include:[{
        model:this.ctx.model.User
      }]
    });
    if (!courseType) {
      this.ctx.throw(404, 'courseType not found');
    }
    return courseType;
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
        model:this.ctx.model.User
      }]
    });
  }

  async del(id) {
    const comment = await this.ctx.model.Comment.findById(id);
    if (!comment) {
      this.ctx.throw(404, 'courseType not found');
    }
    return comment.destroy();
  }
}

module.exports = Comment;

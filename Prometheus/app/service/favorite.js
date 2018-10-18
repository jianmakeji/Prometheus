'use strict';

const Service = require('egg').Service;

class Favorite extends Service {
  async list({ offset = 0, limit = 10, category = 1, userId = 0 }) {
    let condition = {
      offset,
      limit,
      order: [[ 'created_at', 'desc' ]],
      where:{
        userId:favorite.userId,
        category:favorite.category,
      }
    };

    if (favorite.category = 1){
      condition.where.courseId = favorite.courseId,
      condition.include = [{
        model: this.ctx.model.Course
      }];
    }
    else if (favorite.category = 2){
      condition.where.articleId = favorite.articleId,
      condition.include = [{
        model: this.ctx.model.Article
      }];
    }

    return this.ctx.model.Favorite.findAndCountAll(condition);
  }

  async findFavByCategory(favorite) {
    let condition = {
      userId:favorite.userId,
      category:favorite.category,
    };
    if (favorite.category = 1){
      condition.courseId = favorite.courseId,
    }
    else if (favorite.category = 2){
      condition.articleId = favorite.articleId,
    }
    const favorite = await this.ctx.model.Favorite.findAll({
      where:condition,
    });

    return favorite;
  }

  async create(favorite) {
    const favObj = await this.findFavByCategory(favorite);
    if (favorite) {
      this.ctx.throw(404, 'favorite is found');
    }
    else{
      return this.ctx.model.Favorite.create(favorite);
    }

  }

  async del(id) {
    const teacher = await this.ctx.model.Favorite.findById(id);
    if (!teacher) {
      this.ctx.throw(404, 'teacher not found');
    }
    return teacher.destroy();
  }
}

module.exports = Favorite;

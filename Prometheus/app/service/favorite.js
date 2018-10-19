'use strict';

const Service = require('egg').Service;

class Favorite extends Service {
  async list({ offset = 0, limit = 10, category = 1, userId = 0 }) {
    let condition = {
      offset,
      limit,
      order: [[ 'created_at', 'desc' ]],
      where:{
        userId:userId,
        category:category,
      }
    };

    if (category == 1){
      condition.where.courseId = favorite.courseId;
      condition.include = [{
        model: this.ctx.model.Course
      }];
    }
    else if (category == 2){
      condition.where.articleId = favorite.articleId;
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
    if (favorite.category == 1){
      condition.courseId = favorite.courseId;
    }
    else if (favorite.category == 2){
      condition.articleId = favorite.articleId;
    }
    const favoriteObj = await this.ctx.model.Favorite.findAll({
      where:condition,
    });

    return favoriteObj;
  }

  async create(favorite) {
    const favObj = await this.findFavByCategory(favorite);

    if (Object.keys(favObj).length > 0) {
      this.ctx.throw(404, '已经收藏');
    }
    else{
      return this.ctx.model.Favorite.create(favorite);
    }

  }

  async del(favorite) {
    const favObj = await this.findFavByCategory(favorite);

    if (Object.keys(favObj).length > 0) {
      let condition = {
        userId:favorite.userId,
        category:favorite.category,
      };
      if (favorite.category == 1){
        condition.courseId = favorite.courseId;
      }
      else if (favorite.category == 2){
        condition.articleId = favorite.articleId;
      }
      return this.ctx.model.Favorite.destroy({
        where:condition,
      });
    }

  }
}

module.exports = Favorite;

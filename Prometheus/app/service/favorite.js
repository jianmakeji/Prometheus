'use strict';

const Service = require('egg').Service;

class Favorite extends Service {
  async list({ offset = 0, limit = 10, category = 1, userId = 0, thumbName = 'thumb_600_600' }) {
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
      condition.include = [{
        model: this.ctx.model.Course
      }];
    }
    else if (category == 2){
      condition.include = [{
        model: this.ctx.model.Article
      }];
    }
    const favData = await this.ctx.model.Favorite.findAndCountAll(condition);
    const app = this.ctx.app;
    favData.rows.forEach((element, index)=>{
      element.course.thumb = app.signatureUrl(app.courseImagePath + element.course.thumb, thumbName);
      element.course.videoAddress = app.signatureUrl(app.courseVideoPath + element.course.videoAddress);
    });
    return favData;
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

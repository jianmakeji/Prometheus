'use strict';

const Service = require('egg').Service;

class Favorite extends Service {
  async list({ offset = 0, limit = 10, category = 1, userId = 0, thumbName = 'thumb_600_600' }) {

    const favData = await this.ctx.model.Favorite.getFavoriteByPage({offset, limit, category, userId});

    const helper = this.ctx.helper;
    if(category == 1){

      favData.rows.forEach((element, index)=>{
        element.special_course.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.special_course.videoAddress);
      });
    }
    else{
      favData.rows.forEach((element, index)=>{
        element.elite_course.videoAddress = helper.signatureUrl(helper.courseVideoPath + element.elite_course.videoAddress);
      });
    }

    return favData;
  }

  async findFavByCategory(favorite) {
    const favoriteObj = await this.ctx.model.Favorite.findFavByCategory(favorite);
    return favoriteObj;
  }

  async create(favorite) {
    const favObj = await this.ctx.model.Favorite.findFavByCategory(favorite);

    if (Object.keys(favObj).length > 0) {
      this.ctx.throw(404, '已经收藏');
    }
    else{
      return this.ctx.model.Favorite.createFavorite(favorite);
    }

  }

  async del(favorite) {
    const favObj = await this.ctx.model.Favorite.findFavByCategory(favorite);

    if (Object.keys(favObj).length > 0) {
      return this.ctx.model.Favorite.deleteFavorite(favorite);
    }
    else{
      return false;
    }
  }

}

module.exports = Favorite;

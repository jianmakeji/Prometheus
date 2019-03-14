'use strict';

module.exports = app => {
  const {
    INTEGER,
    DATE
  } = app.Sequelize;

  const Favorite = app.model.define('favorite', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    category: INTEGER, // 1:课程  2：文章
    courseId: INTEGER,
    articleId: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Favorite.associate = function() {
    app.model.Favorite.belongsTo(app.model.Article, {
      targetKey: 'Id',
      foreignKey: 'articleId'
    });
    app.model.Favorite.belongsTo(app.model.Course, {
      targetKey: 'Id',
      foreignKey: 'courseId'
    });
  };

  Favorite.getFavoriteByPage = async function({
    offset = 0,
    limit = 10,
    category = 1,
    userId = 0
  }) {
    let condition = {
      offset,
      limit,
      order: [
        ['created_at', 'desc']
      ],
      where: {
        userId: userId,
        category: category,
      }
    };

    if (category == 1) {
      condition.include = [{
        model: app.model.Course
      }];
    } else if (category == 2) {
      condition.include = [{
        model: app.model.Article
      }];
    }
    const favData = await this.findAndCountAll(condition);
    return favData;
  }

  Favorite.findFavByCategory = async function(favorite) {
    let condition = {
      userId: favorite.userId,
      category: favorite.category,
    };
    if (favorite.category == 1) {
      condition.courseId = favorite.courseId;
    } else if (favorite.category == 2) {
      condition.articleId = favorite.articleId;
    }
    const favoriteObj = await this.findAll({
      where: condition,
    });

    return favoriteObj;
  }

  Favorite.createFavorite = async function(favorite) {
    return this.create(favorite);
  }

  Favorite.deleteFavorite = async function(favorite) {

    let condition = {
      userId: favorite.userId,
      category: favorite.category,
    };
    if (favorite.category == 1) {
      condition.courseId = favorite.courseId;
    } else if (favorite.category == 2) {
      condition.articleId = favorite.articleId;
    }
    return this.ctx.model.Favorite.destroy({
      where: condition,
    });
  }

  Favorite.delFavoriteByCourseId = async function(courseId,transaction){
    await this.ctx.model.Favorite.destroy({
      transaction:transaction,
      where:{
        courseId:courseId,
      }
    });
  }

  return Favorite;
};

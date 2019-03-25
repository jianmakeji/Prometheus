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
    category: INTEGER, // 1:名校课程  2：专题课程
    specialCourseId: INTEGER,
    eliteCourseId: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Favorite.associate = function() {
    app.model.Favorite.belongsTo(app.model.SpecialCourse, {
      targetKey: 'Id',
      foreignKey: 'specialCourseId'
    });
    app.model.Favorite.belongsTo(app.model.EliteCourse, {
      targetKey: 'Id',
      foreignKey: 'eliteCourseId'
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
        category: category,
      }
    };

    if(userId != 0){
      condition.where.userId = userId;
    }

    if (category == 1) {
      condition.include = [{
        model: app.model.SpecialCourse
      }];
    } else if (category == 2) {
      condition.include = [{
        model: app.model.EliteCourse
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
      condition.specialCourseId = favorite.specialCourseId;
    } else if (favorite.category == 2) {
      condition.eliteCourseId = favorite.eliteCourseId;
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
      condition.specialCourseId = favorite.specialCourseId;
    } else if (favorite.category == 2) {
      condition.eliteCourseId = favorite.eliteCourseId;
    }
    return this.destroy({
      where: condition,
    });
  }

  Favorite.delFavoriteByCourseId = async function(courseId,category,transaction){

    let condition = {
      transaction:transaction,
      where:{
        category:category
      }
    };

    if (category == 1){
      condition.where.specialCourseId = courseId;
    }
    else if (category == 2){
      condition.where.eliteCourseId = courseId;
    }

    await this.destroy(condition);
  }

  return Favorite;
};

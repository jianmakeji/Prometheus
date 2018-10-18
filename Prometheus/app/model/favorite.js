'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Favorite = app.model.define('favorite', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    category: INTEGER, // 1:课程  2：文章
    courseId: INTEGER,
    articleId:INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  Favorite.associate = function(){
    app.model.Comment.belongsTo(app.model.Article, {targetKey: 'Id', foreignKey: 'articleId'});
    app.model.Comment.belongsTo(app.model.Course, {targetKey: 'Id', foreignKey: 'courseId'});
  };

  return Favorite;
};

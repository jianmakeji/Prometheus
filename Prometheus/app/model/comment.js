'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Comment = app.model.define('comment', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    courseId:INTEGER,
    content: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  Comment.associate = function(){
    app.model.Comment.belongsTo(app.model.User, {targetKey: 'Id', foreignKey: 'userId'});
    app.model.Comment.belongsTo(app.model.Course, {targetKey: 'Id', foreignKey: 'courseId'});
  };
  return Comment;
};

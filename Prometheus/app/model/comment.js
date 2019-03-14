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

  Comment.getCommentbyPage = async function({offset = 0, limit = 10}){
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'desc' ]],
      include:[{
        model:app.model.User,
        attributes: ['username','nickName','avatarUrl'],
      },{
        model:app.model.Course,
        attributes: ['name'],
      }]
    });
  }

  Comment.getCommentById = async function(id){
    const comment = await this.findById(id,{
      include:[{
        model:app.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
    if (!comment) {
      throw new Error('comment not found');
    }
    return comment;
  }

  Comment.createComment = async function(comment){
    return this.create(comment);
  }

  Comment.getCommentByCourseId = async function({ offset = 0, limit = 10, courseId = 0}){
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: { courseId: courseId },
      include:[{
        model:app.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
  }

  Comment.delCommentById = async function(id){
    const comment = await this.findById(id);
    if (!comment) {
      throw new Error('comment not found');
    }
    return comment.destroy();
  }

  return Comment;
};

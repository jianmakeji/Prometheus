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
    category: INTEGER,
    specialCourseId:INTEGER,
    eliteCourseId:INTEGER,
    content: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  Comment.associate = function(){
    app.model.Comment.belongsTo(app.model.User, {targetKey: 'Id', foreignKey: 'userId'});
    app.model.Comment.belongsTo(app.model.SpecialCourse, {targetKey: 'Id', foreignKey: 'specialCourseId'});
    app.model.Comment.belongsTo(app.model.EliteCourse, {targetKey: 'Id', foreignKey: 'eliteCourseId'});
  };

  Comment.getCommentbyPage = async function({offset = 0, limit = 10 , category = 0}){
    let condition = {
      offset,
      limit,
      order: [[ 'id', 'desc' ]],
      where:{

      },
      include:[{
        model:app.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    };

    if( category != 0 ){
      condition.where.category = category;
    }

    if (category == 1){
      let specialCourseModel = {
        model:app.model.SpecialCourse,
        attributes: ['name'],
      }
      condition.include.push(specialCourseModel);
    }
    else if (category == 2){
      let eliteCourseModel = {
        model:app.model.EliteCourse,
        attributes: ['name'],
      }
      condition.include.push(eliteCourseModel);
    }
    return this.findAndCountAll(condition);
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

  Comment.getCommentByEliteCourseId = async function({ offset = 0, limit = 10, eliteCourseId = 0}){
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: { eliteCourseId: eliteCourseId },
      include:[{
        model:app.model.User,
        attributes: ['username','nickName','avatarUrl'],
      }]
    });
  }

  Comment.getCommentBySpecialCourseId = async function({ offset = 0, limit = 10, specialCourseId = 0}){
    return this.findAndCountAll({
      offset,
      limit,
      order: [[ 'id', 'asc' ]],
      where: { specialCourseId: specialCourseId },
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

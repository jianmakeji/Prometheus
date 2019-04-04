'use strict';

module.exports = app => {
  const { INTEGER, DATE, FLOAT } = app.Sequelize;

  const UserSpColumns = app.model.define('user_spColumns', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    specialColumnId: INTEGER,
    created_at: DATE,
  });

  UserSpColumns.associate = function(){
    app.model.UserSpColumns.belongsTo(app.model.User, {sourceKey:'Id',foreignKey: 'userId'});
    app.model.UserSpColumns.belongsTo(app.model.SpecialColumn, {targetKey: 'Id', foreignKey: 'specialColumnId'});
  }

  UserSpColumns.createUserSpColumns = async function(userSpColumns){
    return await this.create(userSpColumns);
  }

  UserSpColumns.getDataByUserId = async function(userId){
      return await this.findAll({
        where:{
          userId:userId
        }
      });
  }

  return UserSpColumns;
};

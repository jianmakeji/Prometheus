'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    openId: STRING(60),
    username: STRING(30),
    password: STRING(50),
    nickName: STRING(30),
    avatarUrl: STRING(100),
    gender: INTEGER,
    province: STRING(20),
    city: STRING(20),
    country: STRING(30),
    mobile: STRING(16),
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Exchange, { sourceKey:'Id', foreignKey:'userId' });
    app.model.User.belongsToMany(app.model.SpecialColumn,{
      foreignKey:'userId',
      through:{
        model:app.model.Exchange,
        unique:false,
      }
    });
    app.model.User.hasMany(app.model.Comment,{sourceKey:'Id',foreignKey:'userId'});
  };

  return User;
};

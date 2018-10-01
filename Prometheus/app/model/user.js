'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(30),
    password: STRING(50),
    headicon: STRING(100),
    created_at: DATE,
    updated_at: DATE,
  });

  User.prototype.associate = function() {
    app.model.User.hasMany(app.model.Exchange, { as: 'exchange' });
    app.model.User.belongsToMany(app.model.SpecialColumn,{
      foreignKey:'userId',
      through:{
        model:app.model.Exchange,
        unique:false,
      }
    });
  };

  return User;
};

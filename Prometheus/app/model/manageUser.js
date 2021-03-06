'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ManageUser = app.model.define('manage_user', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(30),
    password: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  ManageUser.associate = function() {
      app.model.ManageUser.hasMany(app.model.SdCode, { sourceKey:'Id', foreignKey:'createUserId' });
  };
  

  return ManageUser;
};

'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Teacher = app.model.define('teacher', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(10),
    subject: STRING(8),
    brief: STRING(255),
    avatar: STRING(50),
    created_at: DATE,
    updated_at: DATE,
  });

  Teacher.associate = function() {
    app.model.Teacher.hasMany(app.model.SpecialColumn, {sourceKey:'Id',foreignKey: 'teacherId'});
  };

  return Teacher;
};

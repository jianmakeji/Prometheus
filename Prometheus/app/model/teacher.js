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
    created_at: DATE,
    updated_at: DATE,
  });

  Teacher.prototype.associate = function() {
<<<<<<< HEAD
    app.model.Teacher.hasMany(app.model.SpecialColumn, { as: 'specialColumn', foreignKey: 'teacherId', targetId:'Id'});
=======
    app.model.Teacher.hasMany(app.model.SpecialColumn, { as: 'specialColumns' });
>>>>>>> origin/master
  };
  
  return Teacher;
};

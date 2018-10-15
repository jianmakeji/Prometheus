'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Course = app.model.define('course', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    describe: STRING(255),
    courseType: INTEGER,
    specialColumn: INTEGER,
    thumb: STRING(30),
    duration: INTEGER,
    videoAddress: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  Course.associate = function() {
    app.model.Course.belongsTo(app.model.SpecialColumn, {targetKey: 'Id', foreignKey: 'specialColumn'});
    app.model.Course.belongsTo(app.model.CourseType, {targetKey: 'Id', foreignKey: 'courseType'});
    app.model.Course.hasMany(app.model.Comment,{sourceKey:'Id',foreignKey:'courseId'});
  };

  return Course;
};

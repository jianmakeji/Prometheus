'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CourseType = app.model.define('course_type', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(20),
    grade: INTEGER,
    describe: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  });

  CourseType.associate = function() {
    app.model.CourseType.hasMany(app.model.SpecialColumn, { foreignKey: 'courseType'});
    app.model.SpecialColumn.hasMany(app.model.Course,{sourceKey:'Id',foreignKey: 'courseType'});
  };

  return CourseType;
};

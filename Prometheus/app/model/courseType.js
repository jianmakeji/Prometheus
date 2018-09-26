'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const CourseType = app.model.define('courseType', {
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

  return CourseType;
};

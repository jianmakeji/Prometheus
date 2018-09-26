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
    videoAddress: STRING(30),
    created_at: DATE,
    updated_at: DATE,
  });

  return Course;
};

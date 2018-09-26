'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const SpecialColumn = app.model.define('special_column', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(16),
    courseType: INTEGER,
    thumb: STRING(30),
    describe: STRING(50),
    price: FLOAT,
    created_at: DATE,
    updated_at: DATE,
  });

  return SpecialColumn;
};

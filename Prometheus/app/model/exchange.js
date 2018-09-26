'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, FLOAT } = app.Sequelize;

  const Exchange = app.model.define('exchange', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: INTEGER,
    special_column: INTEGER,
    price: FLOAT,
    created_at: DATE,
    updated_at: DATE,
  });

  return Exchange;
};

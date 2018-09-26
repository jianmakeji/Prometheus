'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Article = app.model.define('article', {
    Id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    abstractContent: STRING(255),
    mainContent: TEXT,
    thumb: STRING(160),
    created_at: DATE,
    updated_at: DATE,
  });

  return Article;
};

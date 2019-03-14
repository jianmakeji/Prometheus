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

  Article.getArticleByPage = async function({offset = 0, limit = 10}){
    let resultObj = await this.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
    return resultObj;
  }

  Article.findArticleById = async function(id){
    return this.findById(id);
  }

  Article.createArticle = async function(article){
    return this.create(article);
  }

  Article.updateArticle = async function({id, updates}){
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      throw new Error('article not found');
    }
    return article.update(updates);
  }

  Article.deleteArticleById = async function(id){
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      throw new Error('article not found');
    }
    return article.destroy();
  }
  return Article;
};

'use strict';

const Service = require('egg').Service;

class Article extends Service {
  async list({ offset = 0, limit = 10 }) {
    let resultObj = await this.ctx.model.Article.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });

    const app = this.ctx.app;
    for (let i = 0; i < resultObj.rows.length; i++){
      resultObj.rows[i].thumb = app.signatureUrl(app.getArticleImagePath() + resultObj.rows[i].thumb);
    }

    return resultObj;

  }

  async find(id) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }
    article.thumb = this.ctx.app.signatureUrl(article.thumb);

    return article;
  }

  async create(article) {
    return this.ctx.model.Article.create(article);
  }

  async update({ id, updates }) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }
    return article.update(updates);
  }

  async del(id) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }

    const app =this.ctx.app;
    await app.deleteOssObject(app.getArticleImagePath() + article.thumb);
    return article.destroy();
  }
}

module.exports = Article;

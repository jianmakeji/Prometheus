'use strict';

const Service = require('egg').Service;

class Article extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Article.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });
  }

  async find(id) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }
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
    return article.destroy();
  }
}

module.exports = Article;

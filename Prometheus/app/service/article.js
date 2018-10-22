'use strict';

const Service = require('egg').Service;

class Article extends Service {
  async list({ offset = 0, limit = 10, thumbName = 'thumb_600_600' }) {
    let resultObj = await this.ctx.model.Article.findAndCountAll({
      offset,
      limit,
      order: [[ 'created_at', 'desc' ], [ 'id', 'desc' ]],
    });

    const app = this.ctx.app;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = app.signatureUrl(app.articleImagePath + element.thumb, thumbName);
    });

    return resultObj;

  }

  async find({id = 0,thumbName= 'thumb_600_600'}) {
    const article = await this.ctx.model.Article.findById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }
    const app = this.ctx.app;
    article.thumb = this.ctx.app.signatureUrl(app.articleImagePath + article.thumb, thumbName);

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
    await app.deleteOssObject(app.articleImagePath + article.thumb);
    return article.destroy();
  }
}

module.exports = Article;

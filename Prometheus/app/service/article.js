'use strict';

const Service = require('egg').Service;

class Article extends Service {
  async list({ offset = 0, limit = 10, thumbName = 'thumb_600_600' }) {
    let resultObj = await this.ctx.model.Article.getArticleByPage({
      offset,
      limit
    });

    const helper = this.ctx.helper;

    resultObj.rows.forEach((element, index)=>{
      element.thumb = helper.signatureUrl(helper.articleImagePath + element.thumb, thumbName);
    });

    return resultObj;

  }

  async find({id = 0,thumbName= 'thumb_600_600'}) {
    const article = await this.ctx.model.Article.findArticleById(id);
    if (!article) {
      this.ctx.throw(404, 'article not found');
    }
    const helper = this.ctx.helper;
    article.thumb = this.ctx.helper.signatureUrl(helper.articleImagePath + article.thumb, thumbName);

    return article;
  }

  async create(article) {
    return this.ctx.model.Article.createArticle(article);
  }

  async update({ id, updates }) {
    const article = await this.ctx.model.Article.updateArticle({ id, updates });

    return article;
  }

  async del(id) {
    const helper =this.ctx.helper;
    const article = await this.ctx.model.Article.deleteArticleById(id);
    await helper.deleteOssObject(helper.articleImagePath + article.thumb);
    return article;
  }
}

module.exports = Article;

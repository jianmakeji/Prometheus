'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/manage/article.test.js', () => {

  describe('GET /api/manage/article', () => {
    it('should work', async () => {
      await app.factory.createMany('article', 3);
      const res = await app.httpRequest().get('/api/manage/article?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].mainContent);
    });
  });

  describe('GET /api/manage/article/:id', () => {
    it('should work', async () => {
      const article = await app.factory.create('article');
      const res = await app.httpRequest().get(`/api/manage/article/${article.Id}`);
      assert(res.status === 200);
      assert(res.body.name === article.name);
    });
  });

  describe('POST /api/manage/article', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/manage/article')
        .send({
          abstractContent: 'asdasdsad爱的那是的撒旦',
          name: 'jack',
          mainContent: '奥术大师大所多撒大',
          thumb: 'REGDDM7768B45FD.jpg',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/article/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('PUT /api/manage/article/:id', () => {
    it('should work', async () => {
      app.mockCsrf();
      const article = await app.factory.create('article');
      const resObj = await app.httpRequest().get(`/api/manage/article/${article.Id}`);

      let res = await app.httpRequest().put('/api/manage/article/' + resObj.body.Id)
        .send({
          abstractContent: 'asdasdsad爱的那是的撒旦',
          name: 'jack',
          mainContent: '奥术大师大所多撒大',
          thumb: 'REGDDM7768B45FD.jpg',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/article/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /api/manage/article/:id', () => {
    it('should work', async () => {
      const article = await app.factory.create('article');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/manage/article/${article.Id}`);
      assert(res.status === 200);
    });
  });

});

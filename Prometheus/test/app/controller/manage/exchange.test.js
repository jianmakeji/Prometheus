'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/manage/exchange.test.js', () => {

  describe('GET /api/manage/exchange', () => {
    it('should work', async () => {
      await app.factory.createMany('exchange', 3);
      const res = await app.httpRequest().get('/api/manage/exchange?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].userId);
      assert(res.body.rows[0].special_column);
    });
  });

  describe('GET /api/manage/exchange/:id', () => {
    it('should work', async () => {
      const exchange = await app.factory.create('exchange');
      const res = await app.httpRequest().get(`/api/manage/exchange/${exchange.Id}`);
      assert(res.status === 200);
      assert(res.body.userId === exchange.userId);
    });
  });

  describe('POST /api/manage/exchange', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/manage/exchange')
        .send({
          userId: 1,
          special_column: 2,
          price: 99.00,
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/exchange/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.userId === 1);
    });
  });

  describe('DELETE /api/manage/exchange/:id', () => {
    it('should work', async () => {
      const exchange = await app.factory.create('exchange');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/manage/exchange/${exchange.Id}`);
      assert(res.status === 200);
    });
  });

});

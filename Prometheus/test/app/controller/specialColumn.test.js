'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/specialColumn.test.js', () => {

  describe('GET /specialColumn', () => {
    it('should work', async () => {
      await app.factory.createMany('specialColumn', 3);
      const res = await app.httpRequest().get('/specialColumn?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].courseType);
    });
  });

  describe('GET /specialColumn/:id', () => {
    it('should work', async () => {
      const specialColumn = await app.factory.create('specialColumn');
      const res = await app.httpRequest().get(`/specialColumn/${specialColumn.Id}`);
      assert(res.status === 200);
      assert(res.body.name === specialColumn.name);
    });
  });

  describe('POST /specialColumn', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/specialColumn')
        .send({
          courseType: 1,
          name: 'jack',
          describe: '奥术大师大所多撒大',
          price: 190.00,
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/specialColumn/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /specialColumn/:id', () => {
    it('should work', async () => {
      const specialColumn = await app.factory.create('specialColumn');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/specialColumn/${specialColumn.Id}`);
      assert(res.status === 200);
    });
  });

});

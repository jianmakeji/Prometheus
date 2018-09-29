'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/manage/specialColumn.test.js', () => {

  describe('GET /api/manage/specialColumn', () => {
    it('should work', async () => {
      await app.factory.createMany('specialColumn', 3);
      const res = await app.httpRequest().get('/api/manage/specialColumn?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].courseType);
    });
  });

  describe('GET /api/manage/specialColumn/:id', () => {
    it('should work', async () => {
      const specialColumn = await app.factory.create('specialColumn');
      const res = await app.httpRequest().get(`/api/manage/specialColumn/${specialColumn.Id}`);
      assert(res.status === 200);
      assert(res.body.name === specialColumn.name);
    });
  });

  describe('POST /api/manage/specialColumn', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/manage/specialColumn')
        .send({
          courseType: 1,
          teacherId: 1,
          name: 'jack',
          describe: '奥术大师大所多撒大',
          price: 190.00,
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/specialColumn/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('PUT /api/manage/specialColumn', () => {
    it('should work', async () => {
      app.mockCsrf();
      const specialColumn = await app.factory.create('specialColumn');
      const resObj = await app.httpRequest().get(`/api/manage/specialColumn/${specialColumn.Id}`);

      let res = await app.httpRequest().put('/api/manage/specialColumn/'+resObj.body.Id)
        .send({
          courseType: 1,
          teacherId: 1,
          name: 'jack',
          describe: '奥术大师大所多撒大qweqweqweqw',
          price: 299.00,
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/specialColumn/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /api/manage/specialColumn/:id', () => {
    it('should work', async () => {
      const specialColumn = await app.factory.create('specialColumn');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/manage/specialColumn/${specialColumn.Id}`);
      assert(res.status === 200);
    });
  });

});

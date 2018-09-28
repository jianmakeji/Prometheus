'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/manage/courseType.test.js', () => {

  describe('GET /api/manage/courseType', () => {
    it('should work', async () => {
      await app.factory.createMany('courseType', 3);
      const res = await app.httpRequest().get('/api/manage/courseType?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].describe);
    });
  });

  describe('GET /api/manage/courseType/:id', () => {
    it('should work', async () => {
      const courseType = await app.factory.create('courseType');
      const res = await app.httpRequest().get(`/api/manage/courseType/${courseType.Id}`);
      assert(res.status === 200);
      assert(res.body.name === courseType.name);
    });
  });

  describe('POST /api/manage/courseType', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/manage/courseType')
        .send({
          describe: 'asdasdsad爱的那是的撒旦',
          name: 'jack',
          grade: 1,
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/courseType/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /api/manage/courseType/:id', () => {
    it('should work', async () => {
      const courseType = await app.factory.create('courseType');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/manage/courseType/${courseType.Id}`);
      assert(res.status === 200);
    });
  });

});

'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/teacher.test.js', () => {

  describe('GET /teacher', () => {
    it('should work', async () => {
      await app.factory.createMany('teacher', 3);
      const res = await app.httpRequest().get('/teacher?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].subject);
    });
  });

  describe('GET /teacher/:id', () => {
    it('should work', async () => {
      const teacher = await app.factory.create('teacher');
      const res = await app.httpRequest().get(`/teacher/${teacher.Id}`);
      assert(res.status === 200);
      assert(res.body.name === teacher.name);
    });
  });

  describe('POST /teacher', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/teacher')
        .send({
          subject: 'asdasdsad爱的那是的撒旦',
          name: 'jack',
          brief: '奥术大师大所多撒大',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/teacher/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /teacher/:id', () => {
    it('should work', async () => {
      const teacher = await app.factory.create('teacher');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/teacher/${teacher.Id}`);
      assert(res.status === 200);
    });
  });

});

'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/manage/course.test.js', () => {

  describe('GET /api/manage/course', () => {
    it('should work', async () => {
      await app.factory.createMany('course', 3);
      const res = await app.httpRequest().get('/api/manage/course?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].name);
      assert(res.body.rows[0].describe);
    });
  });

  describe('GET /api/manage/course/:id', () => {
    it('should work', async () => {
      const course = await app.factory.create('course');
      const res = await app.httpRequest().get(`/api/manage/course/${course.Id}`);
      assert(res.status === 200);
      assert(res.body.name === course.name);
    });
  });

  describe('POST /api/manage/course', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/api/manage/course')
        .send({
          describe: 'asdasdsad爱的那是的撒旦',
          name: 'jack',
          courseType: 1,
          specialColumn: 1,
          videoAddress: 'JJSSADIO87GTH8.mp4',
          thumb: 'REGDDM7768B45FD.jpg',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/course/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('PUT /api/manage/course/:id', () => {
    it('should work', async () => {
      app.mockCsrf();
      const course = await app.factory.create('course');
      const resObj = await app.httpRequest().get(`/api/manage/course/${course.Id}`);

      let res = await app.httpRequest().put('/api/manage/course/'+resObj.body.Id)
        .send({
          describe: 'asdasdsad爱RRWWQW',
          name: 'jack',
          courseType: 1,
          specialColumn: 1,
          videoAddress: 'JJSSADIO87GTH8.mp4',
          thumb: 'REGDDM7768B45FD.jpg',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/api/manage/course/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.name === 'jack');
    });
  });

  describe('DELETE /api/manage/course/:id', () => {
    it('should work', async () => {
      const course = await app.factory.create('course');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/api/manage/course/${course.Id}`);
      assert(res.status === 200);
    });
  });

});

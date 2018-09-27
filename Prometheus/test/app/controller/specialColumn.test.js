'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/specialColumn.test.js', () => {

  describe('GET /users', () => {
    it('should work', async () => {
      await app.factory.createMany('user', 3);
      const res = await app.httpRequest().get('/users?limit=2&offset=0');
      assert(res.status === 200);
      assert(res.body.count === 3);
      assert(res.body.rows.length === 2);
      assert(res.body.rows[0].username);
      assert(res.body.rows[0].password);
    });
  });

  describe('GET /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      const res = await app.httpRequest().get(`/users/${user.Id}`);
      assert(res.status === 200);
      assert(res.body.password === user.password);
    });
  });

  describe('POST /users', () => {
    it('should work', async () => {
      app.mockCsrf();
      let res = await app.httpRequest().post('/users')
        .send({
          password: '1213yyuywqe78',
          username: 'jack',
          headicon: 'YUSADSADAS.jpg',
        });
      assert(res.status === 201);
      assert(res.body.Id);

      res = await app.httpRequest().get(`/users/${res.body.Id}`);
      assert(res.status === 200);
      assert(res.body.username === 'jack');
    });
  });

  describe('DELETE /users/:id', () => {
    it('should work', async () => {
      const user = await app.factory.create('user');
      app.mockCsrf();
      const res = await app.httpRequest().delete(`/users/${user.Id}`);
      assert(res.status === 200);
    });
  });

});

'use strict';

const { app } = require('egg-mock/bootstrap');
const factories = require('./factories');

before(() => {
  // defined app.factory for build test data
  factories(app);
});

afterEach(async () => {
  // clear database after each test case
  await Promise.all([
    app.model.User.destroy({ truncate: true, force: true }),
    app.model.SpecialColumn.destroy({ truncate: true, force: true }),
    app.model.Article.destroy({ truncate: true, force: true }),
    app.model.Course.destroy({ truncate: true, force: true }),
    app.model.CourseType.destroy({ truncate: true, force: true }),
    app.model.Exchange.destroy({ truncate: true, force: true }),
    console.log('destroy data...'),
  ]);
});

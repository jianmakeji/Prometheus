'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.resources('users', '/users', controller.user);
  router.resources('article', '/article', controller.article);
  router.resources('course', '/course', controller.course);
  router.resources('courseType', '/courseType', controller.courseType);
  router.resources('exchange', '/exchange', controller.exchange);
  router.resources('specialColumn', '/specialColumn', controller.specialColumn);
};

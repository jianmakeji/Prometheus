'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checktoken = app.middleware.checktoken();

  router.get('/', controller.manage.home.index);

  router.post('/api/manage/login',controller.manage.manageUser.login);
  router.post('/api/manage/registerManageUser',controller.manage.manageUser.registerManageUser);

  router.get('/api/getSTSSignature/:fileType', controller.manage.alioss.getSTSSignature);
  router.get('/api/manage/specialColumn/getSpecialColumnsByTeacherId/:id', controller.manage.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/manage/course/getCourseBySpecialColumnId/:id', controller.manage.course.getCourseBySpecialColumnId);
  router.get('/api/manage/course/getCourseByCourseTypeId/:id', controller.manage.course.getCourseByCourseTypeId);
  router.get('/api/manage/course/getCourseByCondition', controller.manage.course.getCourseByCondition);

  //管理后台API接口
  router.resources('manage.users', '/api/manage/users', controller.manage.user);
  router.resources('manage.article', '/api/manage/article', controller.manage.article);
  router.resources('manage.course', '/api/manage/course', controller.manage.course);
  router.resources('manage.courseType', '/api/manage/courseType', controller.manage.courseType);
  router.resources('manage.exchange', '/api/manage/exchange', controller.manage.exchange);
  router.resources('manage.specialColumn', '/api/manage/specialColumn', controller.manage.specialColumn);
  router.resources('manage.teacher', '/api/manage/teacher', controller.manage.teacher);


  //微信小程序数据接口

  router.resources('wx.users', '/api/wx/users', controller.wx.user);
  router.resources('wx.article', '/api/wx/article', controller.wx.article);
  router.resources('wx.course', '/api/wx/course', controller.wx.course);
  router.resources('wx.courseType', '/api/wx/courseType', controller.wx.courseType);
  router.resources('wx.exchange', '/api/wx/exchange', controller.wx.exchange);
  router.resources('wx.specialColumn', '/api/wx/specialColumn', controller.wx.specialColumn);

  //网站接口

  router.resources('website.users', '/api/website/users', controller.website.user);
  router.resources('website.article', '/api/website/article', controller.website.article);
  router.resources('website.course', '/api/website/course', controller.website.course);
  router.resources('website.courseType', '/api/website/courseType', controller.website.courseType);
  router.resources('website.exchange', '/api/website/exchange', controller.website.exchange);
  router.resources('website.specialColumn', '/api/website/specialColumn', controller.website.specialColumn);

};

'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checktoken = app.middleware.checktoken();

  router.get('/', controller.manage.home.index);

  router.post('/api/manage/login',controller.manage.manageUser.login);
  router.post('/api/manage/registerManageUser',checktoken, controller.manage.manageUser.registerManageUser);

  router.get('/api/getSTSSignature/:fileType', checktoken, controller.manage.alioss.getSTSSignature);
  router.get('/api/getUrlSignature', checktoken, controller.manage.alioss.getUrlSignature);

  router.get('/api/manage/specialColumn/getSpecialColumnsByTeacherId/:id', checktoken, controller.manage.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/manage/course/getCourseBySpecialColumnId/:id', checktoken, controller.manage.course.getCourseBySpecialColumnId);
  router.get('/api/manage/course/getCourseByCourseTypeId/:id', checktoken, controller.manage.course.getCourseByCourseTypeId);
  router.get('/api/manage/course/getCourseByCondition', checktoken, controller.manage.course.getCourseByCondition);

  //管理后台API接口
<<<<<<< HEAD
  router.resources('manage.users', '/api/manage/users', controller.manage.user);
  router.resources('manage.article', '/api/manage/article', controller.manage.article);
  router.resources('manage.course', '/api/manage/course', controller.manage.course);
  router.resources('manage.courseType', '/api/manage/courseType',checktoken, controller.manage.courseType);
  router.resources('manage.exchange', '/api/manage/exchange', controller.manage.exchange);
  router.resources('manage.specialColumn', '/api/manage/specialColumn', controller.manage.specialColumn);
  router.resources('manage.teacher', '/api/manage/teacher', controller.manage.teacher);
=======
  router.resources('manage.users', '/api/manage/users', checktoken, controller.manage.user);
  router.resources('manage.article', '/api/manage/article', checktoken, controller.manage.article);
  router.resources('manage.course', '/api/manage/course', checktoken, controller.manage.course);
  router.resources('manage.courseType', '/api/manage/courseType', checktoken, controller.manage.courseType);
  router.resources('manage.exchange', '/api/manage/exchange', checktoken, controller.manage.exchange);
  router.resources('manage.specialColumn', '/api/manage/specialColumn', checktoken, controller.manage.specialColumn);
  router.resources('manage.teacher', '/api/manage/teacher', checktoken, controller.manage.teacher);
>>>>>>> origin/master


  //微信小程序数据接口
  router.get('/api/wx/specialColumn/getSpecialColumnsByTeacherId/:id', controller.wx.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/wx/course/getCourseBySpecialColumnId/:id', controller.wx.course.getCourseBySpecialColumnId);
  router.get('/api/wx/course/getCourseByCourseTypeId/:id', controller.wx.course.getCourseByCourseTypeId);
  router.get('/api/wx/course/getCourseByCondition', controller.wx.course.getCourseByCondition);

  router.resources('wx.users', '/api/wx/users', controller.wx.user);
  router.resources('wx.article', '/api/wx/article', controller.wx.article);
  router.resources('wx.course', '/api/wx/course', controller.wx.course);
  router.resources('wx.courseType', '/api/wx/courseType', controller.wx.courseType);
  router.resources('wx.exchange', '/api/wx/exchange', controller.wx.exchange);
  router.resources('wx.specialColumn', '/api/wx/specialColumn', controller.wx.specialColumn);

  //网站接口
  router.get('/api/website/specialColumn/getSpecialColumnsByTeacherId/:id', controller.website.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/website/course/getCourseBySpecialColumnId/:id', controller.website.course.getCourseBySpecialColumnId);
  router.get('/api/website/course/getCourseByCourseTypeId/:id', controller.website.course.getCourseByCourseTypeId);
  router.get('/api/website/course/getCourseByCondition', controller.website.course.getCourseByCondition);

  router.resources('website.users', '/api/website/users', controller.website.user);
  router.resources('website.article', '/api/website/article', controller.website.article);
  router.resources('website.course', '/api/website/course', controller.website.course);
  router.resources('website.courseType', '/api/website/courseType', controller.website.courseType);
  router.resources('website.exchange', '/api/website/exchange', controller.website.exchange);
  router.resources('website.specialColumn', '/api/website/specialColumn', controller.website.specialColumn);

};

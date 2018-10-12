'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const managerChecktoken = app.middleware.checktoken();
  const wxChecktoken = app.middleware.wxCheckToken();

  router.get('/', controller.manage.home.index);

  router.post('/api/manage/login',controller.manage.manageUser.login);
  router.post('/api/manage/registerManageUser',managerChecktoken, controller.manage.manageUser.registerManageUser);
  router.get('/api/manage/checkToken/:token',controller.manage.manageUser.checkToken);
  router.get('/api/getSTSSignature/:fileType', managerChecktoken, controller.manage.alioss.getSTSSignature);
  router.get('/api/getUrlSignature', managerChecktoken, controller.manage.alioss.getUrlSignature);

  router.get('/api/manage/specialColumn/getSpecialColumnsByTeacherId/:id', managerChecktoken, controller.manage.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/manage/course/getCourseBySpecialColumnId/:id', managerChecktoken, controller.manage.course.getCourseBySpecialColumnId);
  router.get('/api/manage/course/getCourseByCourseTypeId/:id', managerChecktoken, controller.manage.course.getCourseByCourseTypeId);
  router.get('/api/manage/course/getCourseByCondition', managerChecktoken, controller.manage.course.getCourseByCondition);

  //管理后台API接口
  router.resources('manage.users', '/api/manage/users', managerChecktoken, controller.manage.user);
  router.resources('manage.article', '/api/manage/article', managerChecktoken, controller.manage.article);
  router.resources('manage.course', '/api/manage/course', managerChecktoken, controller.manage.course);
  router.resources('manage.courseType', '/api/manage/courseType', managerChecktoken, controller.manage.courseType);
  router.resources('manage.exchange', '/api/manage/exchange', managerChecktoken, controller.manage.exchange);
  router.resources('manage.specialColumn', '/api/manage/specialColumn', managerChecktoken, controller.manage.specialColumn);
  router.resources('manage.teacher', '/api/manage/teacher', managerChecktoken, controller.manage.teacher);
  router.resources('manage.comment', '/api/manage/comment', managerChecktoken, controller.manage.comment);

  //微信小程序数据接口
  router.get('/api/wx/specialColumn/getSpecialColumnsByTeacherId/:id', controller.wx.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/wx/course/getCourseBySpecialColumnId/:id', controller.wx.course.getCourseBySpecialColumnId);
  router.get('/api/wx/course/getCourseByCourseTypeId/:id', controller.wx.course.getCourseByCourseTypeId);
  router.get('/api/wx/course/getCourseByCondition', controller.wx.course.getCourseByCondition);
  router.get('/api/wx/specialColumn/getSpecialColumnsByCourseType', controller.wx.specialColumn.getSpecialColumnsByCourseType);
  router.get('/api/wx/comment/getCommentByCourseId', controller.wx.comment.getCommentByCourseId);

  router.resources('wx.users', '/api/wx/users', controller.wx.user);
  router.resources('wx.article', '/api/wx/article', controller.wx.article);
  router.resources('wx.course', '/api/wx/course', wxChecktoken, controller.wx.course);
  router.resources('wx.courseType',  '/api/wx/courseType', wxChecktoken, controller.wx.courseType);
  router.resources('wx.exchange', '/api/wx/exchange', wxChecktoken, controller.wx.exchange);
  router.resources('wx.specialColumn', '/api/wx/specialColumn', wxChecktoken, controller.wx.specialColumn);
  router.resources('wx.comment', '/api/wx/comment', wxChecktoken, controller.wx.comment);

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

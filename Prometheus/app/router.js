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

  router.get('/api/manage/specialColumn/getSpecialColumnsByTeacherId', managerChecktoken, controller.manage.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/manage/eliteCourse/getEliteCourseByEliteSchoolId', managerChecktoken, controller.manage.eliteCourse.getEliteCourseByEliteSchoolId);
  router.get('/api/manage/eliteCourse/getQRCode', managerChecktoken, controller.manage.eliteCourse.getQRCode);
  router.get('/api/manage/eliteSchool/getEliteSchoolName', managerChecktoken, controller.manage.eliteSchool.getEliteSchoolName);

  router.get('/api/manage/specialCourse/getSpecialCourseBySpecialColumnId', managerChecktoken, controller.manage.specialCourse.getSpecialCourseBySpecialColumnId);
  router.get('/api/manage/specialCourse/getSpecialCourseByCondition', managerChecktoken, controller.manage.specialCourse.getSpecialCourseByCondition);
  router.get('/api/manage/specialCourse/getQRCode', managerChecktoken, controller.manage.specialCourse.getQRCode);
  router.get('/api/manage/specialColumn/getSpecialColumnsByGradeId', controller.manage.specialColumn.getSpecialColumnsByGradeId);

  router.post('/api/manage/sdCode/createSdCode', managerChecktoken, controller.manage.sdCode.createSdCode);
  router.get('/api/manage/sdCode/getDataBySdCode', managerChecktoken, controller.manage.sdCode.getDataBySdCode);

  router.resources('manage.users', '/api/manage/users', managerChecktoken, controller.manage.user);
  router.resources('manage.eliteSchool', '/api/manage/eliteSchool', managerChecktoken, controller.manage.eliteSchool);
  router.resources('manage.eliteCourse', '/api/manage/eliteCourse', managerChecktoken, controller.manage.eliteCourse);
  router.resources('manage.specialCourse', '/api/manage/specialCourse', managerChecktoken, controller.manage.specialCourse);
  router.resources('manage.exchange', '/api/manage/exchange', managerChecktoken, controller.manage.exchange);
  router.resources('manage.specialColumn', '/api/manage/specialColumn', managerChecktoken, controller.manage.specialColumn);
  router.resources('manage.teacher', '/api/manage/teacher', managerChecktoken, controller.manage.teacher);
  router.resources('manage.comment', '/api/manage/comment', managerChecktoken, controller.manage.comment);
  router.resources('manage.school', '/api/manage/school', managerChecktoken, controller.manage.school);

  //微信小程序数据接口
  router.get('/api/wx/specialColumn/getSpecialColumnsByTeacherId', wxChecktoken, controller.wx.specialColumn.getSpecialColumnsByTeacherId);
  router.get('/api/wx/specialColumn/getRecommendSpecialColumn', controller.wx.specialColumn.getRecommendSpecialColumn);
  router.get('/api/wx/comment/getCommentByEliteCourseId', wxChecktoken, controller.wx.comment.getCommentByEliteCourseId);
  router.get('/api/wx/comment/getCommentBySpecialCourseId', wxChecktoken, controller.wx.comment.getCommentBySpecialCourseId);
  router.get('/api/wx/eliteCourse/searchByKeywords', wxChecktoken, controller.wx.eliteCourse.searchByKeywords);
  router.get('/api/wx/specialCourse/searchByKeywords', wxChecktoken, controller.wx.specialCourse.searchByKeywords);
  router.get('/api/wx/favorite/checkIsFavite', wxChecktoken, controller.wx.favorite.checkIsFavite);
  router.get('/api/wx/favorite/deleteFavorite', wxChecktoken, controller.wx.favorite.deleteFavorite);
  router.get('/api/wx/user/getWxCode', controller.wx.user.getWxCode);

  router.get('/api/wx/eliteCourse/getEliteCourseByEliteSchoolId', wxChecktoken, controller.wx.eliteCourse.getEliteCourseByEliteSchoolId);
  router.get('/api/wx/specialCourse/getSpecialCourseBySpecialColumnId', wxChecktoken, controller.wx.specialCourse.getSpecialCourseBySpecialColumnId);
  router.get('/api/wx/specialCourse/getSpecialCourseByCondition', wxChecktoken, controller.wx.specialCourse.getSpecialCourseByCondition);
  router.get('/api/wx/specialCourse/searchByKeywords', wxChecktoken, controller.wx.specialCourse.searchByKeywords);
  router.get('/api/wx/specialCourse/authirtyCourse', wxChecktoken, controller.wx.specialCourse.authirtyCourse);

  router.get('/api/wx/sdCode/activeSdCode', wxChecktoken, controller.manage.sdCode.activeSdCode);

  router.resources('wx.users', '/api/wx/users', controller.wx.user);
  router.resources('wx.exchange', '/api/wx/exchange', wxChecktoken, controller.wx.exchange);
  router.resources('wx.specialColumn', '/api/wx/specialColumn', wxChecktoken, controller.wx.specialColumn);
  router.resources('wx.comment', '/api/wx/comment', wxChecktoken, controller.wx.comment);
  router.resources('wx.favorite', '/api/wx/favorite', wxChecktoken, controller.wx.favorite);
  router.resources('wx.school', '/api/wx/school', controller.wx.school);
  router.resources('wx.eliteSchool', '/api/wx/eliteSchool', controller.wx.eliteSchool);
  router.resources('wx.eliteCourse', '/api/wx/eliteCourse', controller.wx.eliteCourse);
  router.resources('wx.specialCourse', '/api/wx/specialCourse', wxChecktoken, controller.wx.specialCourse);

  //网站接口
  router.get('/school', controller.website.home.school);
  router.get('/eliteSchoolFile', controller.website.home.eliteSchoolFile);
  router.get('/specialColumnFile', controller.website.home.specialColumnFile);
  router.get('/website/eliteSchool/downloadByCondition', controller.website.eliteSchool.downloadByCondition);
  router.get('/website/specialColumn/downloadByCondition', controller.website.specialColumn.downloadByCondition);
  router.get('/website/school/getSchoolList', controller.website.school.getSchoolList);

  /*
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
*/
};

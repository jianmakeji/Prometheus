//app.js
const mtjwxsdk = require("./utils/mtj-wx-sdk.js");
App({
   data: {
      openid: "",
      httpHeader: {
         "Accept": 'application/json',
         "content-type": 'application/json',
         "Authorization": ""
      }
   },

   onLaunch: function() {
      this.openid = wx.getStorageSync("openid");
   },
   // 全局数据
   globalData: {
      serverHost: "https://bestpro.vip",
      // serverHost: "http://192.168.3.252:7001",

      // request数据请求路径
      globalAPI: {
         getWxCode: "/api/wx/user/getWxCode",
         createUser: "/api/wx/users", //授权并创建用户

         getCourseData: "/api/wx/course",
         getCourseTypeData: "/api/wx/courseType",
         getSpecialColumnData: "/api/wx/specialColumn",
         searchByKeywords: "/api/wx/course/searchByKeywords?limit=100000&offset=0&keyword=",

         getSpecialColumnsByTeacherId: '/api/wx/specialColumn/getSpecialColumnsByTeacherId/:id',
         getCourseBySpecialColumnId: '/api/wx/course/getCourseBySpecialColumnId/:id',
         getCourseByCourseTypeId: '/api/wx/course/getCourseByCourseTypeId/:id',
         getCourseByCondition: '/api/wx/course/getCourseByCondition',
         getSpecialColumnsByCourseType: "/api/wx/specialColumn/getSpecialColumnsByCourseType",
         getCommentByCourseId: "/api/wx/comment/getCommentByCourseId?limit=10&offset=",

         createComment: "/api/wx/comment", //添加评论

         checkIsFavite: "/api/wx/favorite/checkIsFavite?",
         getFavoriteByCategoryAndUserid: "/api/wx/favorite?limit=1000&offset=",
         createFavorite: "/api/wx/favorite", //添加收藏
         deleteFavorite: "/api/wx/favorite/deleteFavorite", //删除收藏
      },
      // 小程序界面路径
      pageUrl: {
         curriculumDetail: '/pages/curriculum/curriculumDetail/curriculumDetail',
         curriculum: "/pages/curriculum/curriculum",
         curriculumList: "/pages/curriculum/curriculumList/curriculumList",
         welcome: '/pages/welcome/welcome',
         myCollect: '/pages/Myinfo/myCollect/myCollect'
      }
   }
})
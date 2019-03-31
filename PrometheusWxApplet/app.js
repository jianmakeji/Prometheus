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

   onLaunch: function () {
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

         //推荐界面
         getRecommendSpecialColumn: "/api/wx/specialColumn/getRecommendSpecialColumn",

         //课程界面
            //名校试题
            getSchoolData: "/api/wx/school",
            //专题突破
            getSpecialColumnData: "/api/wx/specialColumn",

         // 名校试题界面
         getEliteSchoolData: '/api/wx/eliteSchool',

         // 名校试题视频界面
         getEliteCourseByEliteSchoolId:"/api/wx/eliteCourse/getEliteCourseByEliteSchoolId",

         // 名校试题视频详情界面
         getEliteCourseDataById: "/api/wx/eliteCourse/",

         // 专题详情 & 专题视频
         getSpecialColumnById:"/api/wx/specialColumn/",
         getSpecialCourseBySpecialColumnId:"/api/wx/specialCourse/getSpecialCourseBySpecialColumnId",
         getSpecialCourseDataById:"/api/wx/specialCourse/",

         // 收藏
         getFavoriteByCategory: "/api/wx/favorite",
         checkIsFavite: "/api/wx/favorite/checkIsFavite",
         createFavorite: "/api/wx/favorite", //添加收藏
         deleteFavorite: "/api/wx/favorite/deleteFavorite", //删除收藏

         // 评论
         createComment: "/api/wx/comment", //添加评论
         getCommentByEliteCourseId: "/api/wx/comment/getCommentByEliteCourseId", 
         getCommentBySpecialCourseId: "/api/wx/comment/getCommentBySpecialCourseId",

         // 搜索
         searchEliteCourseByKeywords: "/api/wx/eliteCourse/searchByKeywords",
         searchSpecialCourseByKeywords:"/api/wx/specialCourse/searchByKeywords",

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

         
         getFavoriteByCategoryAndUserid: "/api/wx/favorite?limit=1000&offset=",
      },
      gradeData: [
         { id: 7, title: "七年级" },
         { id: 8, title: "八年级" },
         { id: 9, title: "九年级" }
         // { id: 10, title: "高一" },
         // { id: 11, title: "高二" },
         // { id: 12, title: "高三" }
      ],
      subjectData:[
         { id: 1, title: "数学" },
         { id: 2, title: "英语" },
         { id: 3, title: "物理" },
         { id: 4, title: "化学" }
      ],
      // 小程序界面路径
      pageUrl: {
         recommend:"/pages/recommend/recommend",
         // 课程
         curriculum: "/pages/curriculum/curriculum",
         // 专题详情
         specialColumnDetail: "/pages/curriculum/specialColumnDetail/specialColumnDetail",
         // 专题视频详情
         specialCourseDetail:"/pages/curriculum/specialCourseDetail/specialCourseDetail",
         // 名校试题
         eliteSchool: "/pages/curriculum/eliteSchool/eliteSchool",
         // 名校试题视频列表
         eliteCourse: "/pages/curriculum/eliteCourse/eliteCourse",
         // 名校试题视频详情
         eliteCourseDetail: "/pages/curriculum/eliteCourseDetail/eliteCourseDetail",

         // curriculumDetail: '/pages/curriculum/curriculumDetail/curriculumDetail',
         // curriculumList: "/pages/curriculum/curriculumList/curriculumList",
         welcome: '/pages/welcome/welcome',
         myCollect: '/pages/Myinfo/myCollect/myCollect'
      }
   }
})
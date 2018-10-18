//app.js
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
    globalData: {

        serverHost: "http://192.168.3.163:7001",
        // serverHost: "https://prometheus.design-engine.org",
        
        globalAPI: {
            createUser: "/api/wx/users", //授权并创建用户

            getCourseData: "/api/wx/course",
            getCourseTypeData: "/api/wx/courseType",
            getSpecialColumnData: "/api/wx/specialColumn",

            getSpecialColumnsByTeacherId: '/api/wx/specialColumn/getSpecialColumnsByTeacherId/:id',
            getCourseBySpecialColumnId: '/api/wx/course/getCourseBySpecialColumnId/:id',
            getCourseByCourseTypeId: '/api/wx/course/getCourseByCourseTypeId/:id',
            getCourseByCondition: '/api/wx/course/getCourseByCondition',
            getSpecialColumnsByCourseType: "/api/wx/specialColumn/getSpecialColumnsByCourseType",
            getCommentByCourseId:"/api/wx/comment/getCommentByCourseId?limit=10&offset=",

            createComment:"/api/wx/comment"         //添加评论
        }
    }
})
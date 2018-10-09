//app.js
App({
    onLaunch: function() {
        // wx.login({
        //     withCredentials:true,
        //     success:function(res){
        //         console.log(res);
        //         if (res.code) {
        //             wx.request({
        //                 url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx781d229c4c3bd932&secret=5ede9e8e53b095852751ff9b7a0a0e2a&js_code=' + res.code +'&grant_type=authorization_code',
        //                 data: {},
        //                 header: {
        //                     'content-type': 'application/json'
        //                 },
        //                 success:function(res){
        //                     console.log("获取openId",res);
        //                 }
        //             })
        //         } else {
        //             // 否则弹窗显示，showToast需要封装
        //             showToast()
        //         }
        //     }
        // })
    },
    globalData: {
        userInfo: null,
        serverHost: "https://prometheus.design-engine.org",
        globalAPI: {
            getCourseData: "/api/wx/course",
            getCourseTypeData: "/api/wx/courseType",
            getSpecialColumnData:"/api/wx/specialColumn",
            
            getSpecialColumnsByTeacherId:'/api/wx/specialColumn/getSpecialColumnsByTeacherId/:id', 
            getCourseBySpecialColumnId:'/api/wx/course/getCourseBySpecialColumnId/:id',
            getCourseByCourseTypeId:'/api/wx/course/getCourseByCourseTypeId/:id',
            getCourseByCondition:'/api/wx/course/getCourseByCondition'
        }
    },
    
})
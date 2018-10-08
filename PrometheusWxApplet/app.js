//app.js
App({
    onLaunch: function() {
        wx.login({
            withCredentials:true,
            success:function(res){
                console.log(res);
                // if (res.code) {
                //     wx.request({
                //         url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx781d229c4c3bd932&secret=5ede9e8e53b095852751ff9b7a0a0e2a&js_code=' + res.code +'&grant_type=authorization_code',
                //         data: {},
                //         header: {
                //             'content-type': 'application/json'
                //         },
                //         success:function(res){
                //             console.log(res);
                //         }
                //     })
                // } else {
                //     // 否则弹窗显示，showToast需要封装
                //     showToast()
                // }
            }
        })
    },
    globalData: {
        userInfo: null,
        serverHost : "https://192.168.3.163:7001",
        globalAPI: {
            getCourseData: "/api/manage/course",
            getCourseTypeData: "/api/manage/courseType",
            getSpecialColumnData:"/api/manage/specialColumn",
        }
    },
    
})
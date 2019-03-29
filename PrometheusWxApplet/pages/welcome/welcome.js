// pages/welcome/welcome.js
var app = getApp();
Page({
   data: {
      courseDetailId: "",
      courseName: "",

      eliteCourseId:"",
      specialCourseId:"",
      category:""
   },

   onLoad: function(options) {
      // options只有id值 和 视频类型变量category 
      // category : 1为专题突破  2为名校试题
      let that = this;
      if(options.eliteCourseId){
         this.setData({
            eliteCourseId: options.eliteCourseId,
            category: options.category
         })
      } else if (options.specialCourseId){
         this.setData({
            specialCourseId: options.specialCourseId,
            category: options.category
         })
      }
      wx.setNavigationBarTitle({
         title: "登录",
      })
   },
   // 用户点击微信登陆按钮
   userInfoHandler(event) {
      let that = this;
      // 微信授权登录
      wx.login({
         success(res) {
            let code = res.code;
            // 获取用户信息
            wx.getUserInfo({
               success(res) {
                  setStorageWithUserInfo(res.userInfo);
               }
            })
            // 获取openid
            wx.request({
               url: app.globalData.serverHost + app.globalData.globalAPI.getWxCode,
               data: {
                  jscode: res.code
               },
               header: {
                  'content-type': 'application/json'
               },
               success: function (res) {
                  wx.setStorageSync("openid", res.data.openid);
                  let data = {
                     nickName: wx.getStorageSync("nickName"),
                     avatarUrl: wx.getStorageSync("avatarUrl"),
                     gender: wx.getStorageSync("gender"),
                     province: wx.getStorageSync("province"),
                     city: wx.getStorageSync("city"),
                     country: wx.getStorageSync("country"),
                     openId: wx.getStorageSync("openid"),
                  }
                  //创建用户
                  wx.request({
                     url: app.globalData.serverHost + app.globalData.globalAPI.createUser,
                     method: "POST",
                     data: data,
                     success(res) {
                        setStorageWithToken(res.data);

                        //  =====================判断是跳转详情页还是首页==================================
                        if (that.data.category == 2) {
                           wx.reLaunch({
                              url: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + that.data.eliteCourseId + "&category=2"
                           })
                        } else if (that.data.category == 1) {
                           wx.reLaunch({
                              url: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + that.data.specialCourseId + "&category=1"
                           })
                        } else {
                           wx.switchTab({
                              url: app.globalData.pageUrl.recommend,
                           })
                        }
                        // ===================================================
                     },
                     fail(err) {
                        wx.showToast({
                           title: '创建用户出错！',
                           icon: none
                        })
                     }
                  })
               }
            })
         }
      })
   }
})

// 添加userInfo缓存
function setStorageWithUserInfo(userInfo) {
   wx.setStorageSync("nickName", userInfo.nickName);
   wx.setStorageSync("avatarUrl", userInfo.avatarUrl);
   wx.setStorageSync("gender", userInfo.gender);
   wx.setStorageSync("province", userInfo.province);
   wx.setStorageSync("city", userInfo.city);
   wx.setStorageSync("country", userInfo.country);
}
// 添加token缓存
function setStorageWithToken(tokenInfo) {
   wx.setStorageSync("token", tokenInfo.token);
   wx.setStorageSync("userId", tokenInfo.userId);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
}
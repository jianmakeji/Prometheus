// pages/welcome/welcome.js
var app = getApp();
Page({
   data: {
      courseDetailId: "",
      courseName: ""
   },

   onLoad: function(options) {
      let that = this;
      if (options.id && options.courseName) {
         this.setData({
            courseDetailId: options.id,
            courseName: options.courseName
         })
      }
      if (wx.getStorageSync("token")) {
         if (options.id) {
            wx.navigateTo({
               url: app.globalData.pageUrl.curriculumDetail + "?id=" + this.data.courseDetailId + "&courseName=" + this.data.courseName,
            })
         } else {
            wx.switchTab({
               url: app.globalData.pageUrl.curriculum,
            })
         }
      }
   },
   // 用户点击微信登陆按钮
   userInfoHandler(event) {
      let that = this;
      // 微信授权登录
      wx.login({
         success(res) {
            console.log("微信授权登录", res);
            let code = res.code;
            // 获取用户信息
            wx.getUserInfo({
               success(res) {
                  console.log("获取用户信息", res);
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
                  console.log("获取openid", res);
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
                        console.log("创建用户", res);
                        wx.hideNavigationBarLoading();
                        setStorageWithToken(res.data);

                        //  =====================判断是跳转详情页还是首页==================================
                        if (that.data.courseDetailId) {
                           console.log("id有值", that.data.courseDetailId);
                           wx.reLaunch({
                              url: app.globalData.pageUrl.curriculumDetail + "?id=" + that.data.courseDetailId + "&courseName=" + that.data.courseName,
                           })
                        } else {
                           console.log("id无值", that.data.courseDetailId);
                           wx.switchTab({
                              url: app.globalData.pageUrl.curriculum,
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
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
      wx.showNavigationBarLoading();
      wx.getUserInfo({
         success(res) {
            setStorageWithUserInfo(res.userInfo); //缓存userInfo
            loginWithCode(that); //login授权登陆 
         },
         fail: function() {
            // fail
            wx.showToast({
               title: '获取信息失败！',
               icon: none
            })
         }
      });
   }
})
// login授权登陆
function loginWithCode(that) {
   wx.login({
      withCredentials: true,
      success: function(res) {
         if (res.code) {
            requestWithCode(that, res);
         } else {
            // 否则弹窗显示，showToast需要封装
            wx.showToast({
               title: '登陆失败',
               icon: none
            })
         }
      }
   })
}
// 根据code请求openid
function requestWithCode(that, res) {
   wx.request({
      url: app.globalData.serverHost + app.globalData.globalAPI.getWxCode,
      data: {
         jscode: res.code
      },
      header: {
         'content-type': 'application/json'
      },
      success: function(res) {
         wx.setStorageSync("openid", res.data.openid);
         that.setData({
            userInfo: wx.getStorageSync("userInfo")
         })
         let data = {
            nickName: wx.getStorageSync("nickName"),
            avatarUrl: wx.getStorageSync("avatarUrl"),
            gender: wx.getStorageSync("gender"),
            province: wx.getStorageSync("province"),
            city: wx.getStorageSync("city"),
            country: wx.getStorageSync("country"),
            openId: wx.getStorageSync("openid"),
         }
         createUserWithuserInfo(that, data);
      },
      fail(err) {}
   })
}
// 建立用户获取token
function createUserWithuserInfo(that, data) {
   wx.request({
      url: app.globalData.serverHost + app.globalData.globalAPI.createUser,
      method: "POST",
      data: data,
      success(res) {
         wx.hideNavigationBarLoading();
         setStorageWithToken(res.data);
         that.setData({
            authorization: wx.getStorageSync("Authorization")
         })

         //  =====================判断是跳转详情页还是首页==================================
         if (that.data.courseDetailId) {
            wx.reLaunch({
               url: app.globalData.pageUrl.curriculumDetail + "?id=" + that.data.courseDetailId + "&courseName=" + that.data.courseName,
            })
         } else {
            wx.switchTab({
               url: app.globalData.pageUrl.curriculum,
            })
         }
         // ===================================================
      },
      fail(err) {
         wx.showToast({
            title: '微信登陆出错！',
            icon: none
         })
      }
   })
}

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
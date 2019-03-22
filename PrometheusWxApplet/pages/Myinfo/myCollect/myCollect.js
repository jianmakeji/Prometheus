// pages/Myinfo/myCollect/myCollect.js
var app = getApp();
Page({
   /**
    * 页面的初始数据
    */
   data: {
      courseDataList: [],
      courseOffset: 0,
      userId: ""
   },
   // 课程详情
   clickClass: function(event) {
      console.log(event.currentTarget.dataset.courseId, event.currentTarget.dataset.courseName);
      wx.navigateTo({
         url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.courseId + "&courseName=" + event.currentTarget.dataset.courseName
      })
   },
   
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      wx.setNavigationBarTitle({
         title: '我的收藏',
      })
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {
      let that = this;
      this.setData({
         userId: wx.getStorageSync("userId"),
         authorization: wx.getStorageSync("Authorization")
      });
      // 获取课程收藏数据
      if (wx.getStorageSync("token")) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategoryAndUserid + this.data.courseOffset + "&category=1&thumbName=thumb_300_300&userId=" + this.data.userId,
            method: "GET",
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               console.log(res)
               if (res.statusCode == 200) {
                  that.setData({
                     courseDataList: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onShow();
}
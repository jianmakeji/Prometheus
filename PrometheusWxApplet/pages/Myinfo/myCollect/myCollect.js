// pages/Myinfo/myCollect/myCollect.js
var app = getApp();
Page({
   /**
    * 页面的初始数据
    */
   data: {
      currentTab:0,
      category:2,
      collectType: [
         { id: 2, title: "名校试题" },
         { id: 1, title: "专题突破" }
      ],
      eliteCourseData: [],
      eliteCourseOffset: 0,
      eliteCourseCount:0,
      specialCourseData:[],
      specialCourseOffset: 0,
      specialCourseCount:0
   },
   handleChange(event){
      let index = event.detail.key;
      this.setData({
         currentTab: index,
         category: this.data.collectType[index].id
      });
   },
   // 课程详情
   tapEliteCourse: function (event) {
      let dataset = event.currentTarget.dataset;
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + dataset.eliteCourseId + "&category=2"
      })
   },
   tapSpecialCourse(event){
      let dataset = event.currentTarget.dataset;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + dataset.specialCourseId + "&category=1"
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      wx.setNavigationBarTitle({
         title: '我的收藏',
      })
   },
   onReady() {
      let that = this;
      // 获取课程收藏数据
      if (wx.getStorageSync("token")) {
         // 获取名校试题数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data:{
               limit:10,
               offset: that.data.eliteCourseOffset,
               category: 2,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     eliteCourseData: res.data.rows,
                     eliteCourseCount:res.data.count
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
         // 获取专题突破数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data: {
               limit: 10,
               offset: that.data.specialCourseOffset,
               category: 1,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialCourseData: res.data.rows,
                     specialCourseCount: res.data.count
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome
         })
      }
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },
   onPullDownRefresh(){
      let that = this;
      if(this.data.currentTab == "0"){
         this.setData({
            eliteCourseOffset:0
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data: {
               limit: 10,
               offset: that.data.eliteCourseOffset,
               category: 2,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  wx.stopPullDownRefresh();
                  that.setData({
                     eliteCourseData: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         this.setData({
            specialCourseOffset:0
         })
         // 获取专题突破数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data: {
               limit: 10,
               offset: that.data.specialCourseOffset,
               category: 1,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialCourseData: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },
   onReachBottom(){
      let that = this;
      if(this.data.eliteCourseData.length < this.data.eliteCourseCount){
         this.setData({
            eliteCourseOffset:this.data.eliteCourseOffset + 10
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data: {
               limit: 10,
               offset: that.data.eliteCourseOffset,
               category: 2,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  wx.hideLoading();
                  that.setData({
                     eliteCourseData: that.data.eliteCourseData.concat(res.data.rows)
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else if (this.data.specialCourseData.length < this.data.specialCourseCount){
         this.setData({
            specialCourseOffset:this.data.specialCourseOffset + 10
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategory,
            data: {
               limit: 10,
               offset: that.data.specialCourseOffset,
               category: 1,
               userId: wx.getStorageSync("userId"),
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialCourseData: that.data.specialCourseData.concat(res.data.rows)
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         wx.showToast({
            title: '无其他数据',
            icon: "none"
         })
      }
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
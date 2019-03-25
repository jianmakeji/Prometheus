// pages/curriculum/curriculum.js
var app = getApp();
Page({
   data: {
      currentTab: "0",
      courseType: [
         { Id: 1, name: "名校试题" },
         { Id: 2, name:"专题突破"}
      ],
      schoolData: [],         //名校数据
      specialColumnsData:[],  //专题突破数据
   },
   catchSchool(event){
      let schoolId = event.currentTarget.dataset.schoolId;
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteSchool + "?schoolId=" + schoolId
      })
   },
   catchSpecialColumn(event) {
      let specialColumnId = event.currentTarget.dataset.specialColumnId;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialColumnDetail + "?specialColumnId=" + specialColumnId,
      })
   },
   // 类型切换事件
   handleChange: function(event) {
      this.setData({
         currentTab: event.detail.key
      });
   },
   onLoad: function(options) {
      
   },
   onReady(){
      let that = this;
      if (wx.getStorageSync("token")) {
         // 获取名校试题数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSchoolData,
            data: {
               limit: 100
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     schoolData: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         });
         // 获取专题突破数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnData,
            data: {
               limit: 10,
               offset: 0
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialColumnsData: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome,
         })
      }
   },
   onShow: function() {
      
   },
   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function(res) {
      return {
         title: '师道慧享',
         path: app.globalData.pageUrl.curriculum,
         success: function(res) {
            wx.showToast({
               title: '转发成功！',
            })
         },
         fail: function(res) {
            wx.showToast({
               title: '转发失败!',
               icon: 'none'
            })
         }
      }
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
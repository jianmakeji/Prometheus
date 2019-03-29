// pages/curriculum/curriculum.js
var app = getApp();
Page({
   data: {
      currentTab: "0",
      courseType: [
         { Id: 1, name: "名校试题" },
         { Id: 2, name:"专题突破"}
      ],
      schoolCount:0,
      specialColumnsCount:0,
      schoolOffset:0,
      schoolLoadMore:false,
      specialColumnsOffset:0,
      schoolData: [],         //名校数据
      specialColumnsData:[],  //专题突破数据
      specialColumnLoad:false
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
               limit: 10,
               offset: that.data.schoolOffset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     schoolData: res.data.rows,
                     schoolCount:res.data.count
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
               offset: that.data.specialColumnsOffset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialColumnsData: res.data.rows,
                     specialColumnsCount:res.data.count
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
   onPullDownRefresh(){
      let that = this;
      this.setData({
         schoolOffset: 0,
         specialColumnsOffset:0
      })
      // 获取名校试题数据
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getSchoolData,
         data: {
            limit: 10,
            offset:that.data.schoolOffset
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               wx.stopPullDownRefresh();
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
            offset: that.data.specialColumnsOffset
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               wx.stopPullDownRefresh();
               that.setData({
                  specialColumnsData: res.data.rows
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   onReachBottom(){
      let that = this;
      if (this.data.specialColumnsData.length < this.data.specialColumnsCount && this.data.currentTab == "1"){
         this.setData({
            offset: that.data.specialColumnsOffset + 10,
            schoolLoadMore:true
         })
         // 获取专题突破数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnData,
            data: {
               limit: 10,
               offset: this.data.specialColumnsOffset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     specialColumnsData: that.data.specialColumnsData.concat(res.data.rows),
                     schoolLoadMore: false
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else if (this.data.schoolData.length < this.data.schoolCount && this.data.currentTab == "0"){
         this.setData({
            offset: that.data.schoolOffset + 10,
            specialColumnLoad:true
         })
         // 获取专题突破数据
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSchoolData,
            data: {
               limit: 10,
               offset: this.data.schoolOffset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     schoolData: that.data.schoolData.concat(res.data.rows),
                     specialColumnLoad:false
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }      
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
// pages/curriculum/curriculum.js
var app = getApp();
Page({
   data: {
      authorization: "",
      currentTab: "0",
      courseType: [
         { Id: 1, name: "名校试题" },
         { Id: 2, name:"专题突破"}
      ],
      JPgrade7_data: [], //七年级精品课程数据
      JPgrade8_data: [], //八年级精品课程数据
      JPgrade9_data: [], //九年级精品课程数据
      ZT_data: [],
      autoHeight: 1020
   },
   // 类型切换事件
   handleChange: function(event) {
      this.setData({
         currentTab: event.detail.key
      });
      if (event.detail.key == "0") {
         this.setData({
            autoHeight: 402 + 320 * (this.data.JPgrade7_data.length + this.data.JPgrade8_data.length + this.data.JPgrade9_data.length)
         });
      } else {
         this.setData({
            autoHeight: 100 + this.data.ZT_data.length * (300 + 10)
         });
      }
   },
   // scroll滑动监听事件
   bindchange: function(event) {
      this.setData({
         currentTab: event.detail.current
      });
      if (event.detail.current == "0") {
         this.setData({
            autoHeight: 402 + 320 * (this.data.JPgrade7_data.length + this.data.JPgrade8_data.length + this.data.JPgrade9_data.length)
         });
      } else {
         this.setData({
            autoHeight: 100 + this.data.ZT_data.length * (300 + 10)
         });
      }
   },
   //点击专题进行跳转
   catchtap: function(event) {
      let specialColumnId = event.currentTarget.dataset.specialColumnId,
         specialColumnGrade = event.currentTarget.dataset.specialColumnGrade,
         specialColumnName = event.currentTarget.dataset.specialColumnName;
      wx.navigateTo({
         url: app.globalData.pageUrl.curriculumList + "?specialColumnId=" + specialColumnId +
            "&specialColumnName=" + specialColumnGrade + "年级·" + specialColumnName
      })
   },
   onLoad: function(options) {

   },
   onShow: function() {
      let that = this;
      if (wx.getStorageSync("token")) {
         this.setData({
            authorization: wx.getStorageSync("Authorization")
         })
   



                  // 获取名校试题数据
                  wx.request({
                     url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnsByCourseType,
                     data: {
                        courseType: 1,
                        thumbName: "thumb_300_300"
                     },
                     header: {
                        "Authorization": that.data.authorization
                     },
                     success(res) {
                        if (res.statusCode == 200) {
                           let grade7arr = [],
                              grade8arr = [],
                              grade9arr = [];
                           for (let i = 0; i < res.data.length; i++) {
                              if (res.data[i].grade == 7) {
                                 grade7arr.push(res.data[i]);
                              } else if (res.data[i].grade == 8) {
                                 grade8arr.push(res.data[i]);
                              } else if (res.data[i].grade == 9) {
                                 grade9arr.push(res.data[i]);
                              }
                           };
                           that.setData({
                              JPgrade7_data: grade7arr,
                              JPgrade8_data: grade8arr,
                              JPgrade9_data: grade9arr,
                              autoHeight: 402 + 320 * res.data.length
                           });
                        } else if (res.statusCode == 409) {
                           getNewToken(res.data.token, that);
                        }
                     }
                  });
                  // 获取专题突破数据
                  wx.request({
                     url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnsByCourseType,
                     data: {
                        courseType: 2,
                        thumbName: "thumb_300_300"
                     },
                     header: {
                        "Authorization": that.data.authorization
                     },
                     success(res) {
                        if (res.statusCode == 200) {
                           that.setData({
                              ZT_data: res.data
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
   that.onShow();
}
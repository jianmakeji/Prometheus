// pages/curriculum/schoolDetail/schoolDetail.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab: "0",
      // 数据请求参数
      schoolId: "",
      offset: 0,
      grade: 7,
      subject: 1,
      tabIndex: 0,

      gradeList: app.globalData.gradeData,
      subjectList: app.globalData.subjectData,
      count: 0,
      eliteSchoolData: [],
      eliteSchoolLoad: false
   },
   handleChange(event) {
      this.setData({
         currentTab: event.detail.key,
         grade: this.data.gradeList[event.detail.key].id
      });
      let that = this;
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
         data: {
            limit: 10,
            offset: this.data.offset,
            schoolId: this.data.schoolId,
            grade: this.data.grade,
            subject: this.data.subject
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  eliteSchoolData: res.data.rows
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   subjectChange(event) {
      this.setData({
         tabIndex: event.target.id
      })
      this.setData({
         subject: event.currentTarget.dataset.id
      });
      let that = this;
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
         data: {
            limit: 10,
            offset: this.data.offset,
            schoolId: this.data.schoolId,
            grade: this.data.grade,
            subject: this.data.subject
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  eliteSchoolData: res.data.rows
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   catchEliteSchool(event) {
      let eliteSchoolId = event.currentTarget.dataset.eliteSchoolId;
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteCourse + "?eliteSchoolId=" + eliteSchoolId
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      if (options.schoolId) {
         this.setData({
            schoolId: options.schoolId
         })
      }
      wx.setNavigationBarTitle({
         title: '名校试题',
      })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function() {
      let that = this;
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
         data: {
            limit: 10,
            offset: this.data.offset,
            schoolId: this.data.schoolId,
            grade: this.data.grade,
            subject: this.data.subject
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  eliteSchoolData: res.data.rows,
                  count: res.data.count
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function() {
      let that = this;
      this.setData({
         offset: 0
      })
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
         data: {
            limit: 10,
            offset: this.data.offset,
            schoolId: this.data.schoolId,
            grade: this.data.grade,
            subject: this.data.subject
         },
         success(res) {
            if (res.statusCode == 200) {
               wx.stopPullDownRefresh();
               that.setData({
                  eliteSchoolData: res.data.rows
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      let that = this;
      if (this.data.eliteSchoolData.length < this.data.count) {
         this.setData({
            offset: this.data.offset + 10,
            eliteSchoolLoad: true
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
            data: {
               limit: 10,
               offset: this.data.offset,
               schoolId: this.data.schoolId,
               grade: this.data.grade,
               subject: this.data.subject
            },
            success(res) {
               if (res.statusCode == 200) {
                  wx.hideLoading();
                  that.setData({
                     eliteSchoolData: that.data.eliteSchoolData.concat(res.data.rows),
                     eliteSchoolLoad: false
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
   onShareAppMessage: function() {
      return {
         title: '师道慧享',
         path: app.globalData.pageUrl.eliteSchool + "?schoolId=" + this.data.schoolId,
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
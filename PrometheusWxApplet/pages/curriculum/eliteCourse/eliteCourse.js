// pages/curriculum/curriculumList/curriculumList.js
var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      courseType: "",
      classTitle: "",
      eliteSchoolId: "",
      offset: 0,
      count:0,
      dataList: [],
      eliteCourseLoad:false
   },
   clickClass: function(event) {
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + event.currentTarget.dataset.eliteCourseId + "&category=2"
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      this.setData({
         eliteSchoolId: options.eliteSchoolId
      })
   },
   onReady() {
      let that = this;
      if (wx.getStorageSync("token")) {

         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseByEliteSchoolId,
            data: {
               id: this.data.eliteSchoolId,
               limit: 10,
               offset: that.data.offset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  let dataArr = new Array();
                  dataArr = res.data.rows;
                  count:res.data.count;
                  for (let i = 0; i < dataArr.length; i++) {
                     dataArr[i].duration = parseInt(dataArr[i].duration / 60) + ":" + (parseInt(dataArr[i].duration % 60 / 10) ? dataArr[i].duration % 60 : "0" + dataArr[i].duration % 60);
                  }
                  that.setData({
                     dataList: dataArr
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome
         })
      }
   },
   onPullDownRefresh(){
      let that = this;
      this.setData({
         offset:0
      })
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseByEliteSchoolId,
         data: {
            id: this.data.eliteSchoolId,
            limit: 10,
            offset: that.data.offset
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               wx.stopPullDownRefresh();
               let dataArr = new Array();
               dataArr = res.data.rows;
               for (let i = 0; i < dataArr.length; i++) {
                  dataArr[i].duration = parseInt(dataArr[i].duration / 60) + ":" + (parseInt(dataArr[i].duration % 60 / 10) ? dataArr[i].duration % 60 : "0" + dataArr[i].duration % 60);
               }
               that.setData({
                  dataList: dataArr
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   onReachBottom(){
      let that = this;
      if (this.data.dataList.length < this.data.count){
         this.setData({
            offset:this.data.offset + 10,
            eliteCourseLoad:true
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseByEliteSchoolId,
            data: {
               id: this.data.eliteSchoolId,
               limit: 10,
               offset: that.data.offset
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  let dataArr = new Array();
                  dataArr = res.data.rows;
                  for (let i = 0; i < dataArr.length; i++) {
                     dataArr[i].duration = parseInt(dataArr[i].duration / 60) + ":" + (parseInt(dataArr[i].duration % 60 / 10) ? dataArr[i].duration % 60 : "0" + dataArr[i].duration % 60);
                  }
                  that.setData({
                     dataList: that.data.dataList.concat(dataArr),
                     eliteCourseLoad:false
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },
   onShareAppMessage(){
      return {
         title: '师道慧享',
         path: app.globalData.pageUrl.eliteCourse + "?eliteSchoolId=" + this.data.eliteSchoolId,
         success: function (res) {
            wx.showToast({
               title: '转发成功！',
            })
         },
         fail: function (res) {
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
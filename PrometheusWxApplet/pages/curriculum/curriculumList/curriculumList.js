// pages/curriculum/curriculumList/curriculumList.js
var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      authorization: "",
      courseType: "",
      classTitle: "",
      specialColumnId: "",
      specialColumnName: "", //标题
      dataList: []
   },
   clickClass: function(event) {
      wx.navigateTo({
         url: app.globalData.pageUrl.curriculumDetail + "?id=" + event.currentTarget.dataset.courseId + "&courseName=" + event.currentTarget.dataset.courseName
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      wx.setNavigationBarTitle({
         title: options.specialColumnName,
      })
      this.setData({
         specialColumnId: options.specialColumnId
      })
   },
   onShow(){
      let that = this;
      if (wx.getStorageSync("token")) {
         this.setData({
            authorization: wx.getStorageSync("Authorization")
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCourseBySpecialColumnId.replace(":id", this.data.specialColumnId),
            data: {
               thumbName: "thumb_300_300"
            },
            header: {
               "Authorization": that.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  let dataListArr = res.data.rows;
                  for (let i = 0; i < res.data.rows.length; i++) {
                     dataListArr[i].duration = parseInt(res.data.rows[i].duration / 60) + ":" + (parseInt(res.data.rows[i].duration % 60 / 10) ? res.data.rows[i].duration % 60 : "0" + res.data.rows[i].duration % 60);
                  }
                  that.setData({
                     dataList: dataListArr
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
   }
})
function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onShow();
}
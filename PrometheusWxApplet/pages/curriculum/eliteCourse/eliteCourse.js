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
      specialColumnName: "", //标题
      dataList: []
   },
   clickClass: function(event) {
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + event.currentTarget.dataset.eliteCourseId
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      console.log(options.eliteSchoolId)
      this.setData({
         eliteSchoolId: options.eliteSchoolId
      })
   },
   onReady(){
      let that = this;
      if (wx.getStorageSync("token")) {

         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseByEliteSchoolId,
            data: {
               id: this.data.eliteSchoolId,
               limit: 10,
               offset: 0
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               console.log(res)
               if (res.statusCode == 200) {
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
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome
         })
      }
   },
   onShow(){
      
   }
})
function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
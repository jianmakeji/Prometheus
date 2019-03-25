// pages/curriculum/schoolDetail/schoolDetail.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab:"0",
      // 数据请求参数
      schoolId:"",
      offset:0,
      grade:7,
      subject:1,
      tabIndex:0,

      gradeList: app.globalData.gradeData,
      subjectList: app.globalData.subjectData,
      eliteSchoolData:[],
      loadMore:false
   },
   handleChange(event){
      console.log(event)
      this.setData({
         currentTab: event.detail.key,
         grade: this.data.gradeList[event.detail.key].id
      });
      let that = this;
      if(wx.getStorageSync("token")){
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
            data: {
               limit: 10,
               offset: this.data.offset,
               schoolId: this.data.schoolId,
               grade: this.data.grade,
               subject: this.data.subject
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
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
      }
   },
   subjectChange(event){
      this.setData({
         tabIndex: event.target.id
      })
      this.setData({
         subject: event.currentTarget.dataset.id
      });
      let that = this;
      if (wx.getStorageSync("token")) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
            data: {
               limit: 10,
               offset: this.data.offset,
               schoolId: this.data.schoolId,
               grade: this.data.grade,
               subject: this.data.subject
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
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
      }
   },
   catchEliteSchool(event){
      console.log(event)
      let eliteSchoolId = event.currentTarget.dataset.eliteSchoolId;
      wx.navigateTo({
         url: app.globalData.pageUrl.eliteCourse + "?eliteSchoolId=" + eliteSchoolId
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if(options.schoolId){
         this.setData({
            schoolId: options.schoolId
         })
      }
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
      let that = this;
      if (wx.getStorageSync("token")) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteSchoolData,
            data: {
               limit: 10,
               offset: this.data.offset,
               schoolId: this.data.schoolId,
               grade: this.data.grade,
               subject: this.data.subject
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
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
      }
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})
function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
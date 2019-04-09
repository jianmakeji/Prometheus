const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      specialColumnId:"",

      sdCode:""
   },
   changeCode(event){
      this.setData({
         sdCode:event.detail.detail.value
      })
   },
   bindSdCode(event){
      let that = this;
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.activeSdCode,
         data: {
            code: this.data.sdCode,
            bindUserId: wx.getStorageSync("userId")
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res){
            if (res.data.status == 200){
               wx.showToast({
                  title: res.data.message
               })
               wx.navigateBack({
                  url: app.globalData.pageUrl.specialColumnDetail + "?specialColumnId=" + that.data.specialColumnId
               })
            } else if (res.data.status == 500){
               wx.showToast({
                  title: res.data.message,
                  icon:"none"
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if (wx.getStorageSync("token")) {
         if (options.specialColumnId) {
            this.setData({
               specialColumnId: options.specialColumnId
            })
         }
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome,
         })
      }
      wx.setNavigationBarTitle({
         title: '激活师道码',
      })
   },
})
function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
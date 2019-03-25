// pages/recommend/recommend.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentPage:"1",
      totalPage:"",
      dataList:[]
   },
   // cardSwiper
   swiperChange(event) {
      let currentPage = event.detail.current;
      this.setData({
         currentPage: currentPage + 1
      })
   },
   // 点击推荐专题
   catchItem(event){
      let specialColumnId = event.currentTarget.dataset.specialColumnId;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialColumnDetail + "?specialColumnId=" + specialColumnId,
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if(wx.getStorageSync("token")){

      }else{
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome,
         })
      }
   },
   onReady(){
      let that = this;
      if (wx.getStorageSync("token")) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getRecommendSpecialColumn,
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            data: { limit: 10 },
            success(res) {
               console.log(res);
               if (res.statusCode == 200) {
                  that.setData({
                     dataList: res.data,
                     totalPage: res.data.length
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
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
// pages/recommend/recommend.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      marginTop: "",
      pageMarginTop: "",
      currentPage: "1",
      totalPage: "",
      dataList: []
   },
   // cardSwiper
   swiperChange(event) {
      let currentPage = event.detail.current;
      this.setData({
         currentPage: currentPage + 1
      })
   },
   // 点击推荐专题
   catchItem(event) {
      let specialColumnId = event.currentTarget.dataset.specialColumnId;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialColumnDetail + "?specialColumnId=" + specialColumnId,
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      wx.setNavigationBarTitle({
         title: '推荐',
      })
   },
   onReady() {
      let that = this;
      wx.getSystemInfo({
         success: function(res) {
            if (res.screenHeight <= 667) {
               that.setData({
                  marginTop: "20rpx",
                  pageMarginTop: "-60rpx"
               })
            } else if (res.screenHeight > 667 && res.screenHeight <= 812) {
               that.setData({
                  marginTop: "48rpx",
                  pageMarginTop: "-60rpx"
               })
            } else {
               that.setData({
                  marginTop: "96rpx",
                  pageMarginTop: "60rpx"
               })
            }
         },
      })
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getRecommendSpecialColumn,
         data: {
            limit: 10,
            thumb: "thumb_330_528"
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  dataList: res.data,
                  totalPage: res.data.length
               })
            }
         }
      })
   },
   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function() {

   }
})
// pages/search/search.js
var app = getApp();
Page({
   // 页面的初始数据
   data: {
      searchCursor: "",
      searchDivider: false,
      dataList: [],
      storageData: "",
      searchValue: "",
      userId: ""
   },
   // 搜索结果点击跳转到详情
   clickClass: function(event) {
      wx.navigateTo({
         url: app.globalData.pageUrl.curriculumDetail + "?id=" + event.currentTarget.dataset.id + "&courseType=" + event.currentTarget.dataset.courseType + "&courseName=" + event.currentTarget.dataset.courseName
      })
   },
   // input内容变化监听
   bindInput: function(event) {
      this.setData({
         searchValue: event.detail.value,
         storageData: wx.getStorageSync('search')
      })
      if (event.detail.cursor == 0) {
         this.setData({
            searchCursor: 0,
            storageData: wx.getStorageSync('search'),
            searchDivider: false
         })
      }
   },
   bindConfirmr: function(event) {
      let that = this,
         urlData = app.globalData.serverHost + app.globalData.globalAPI.searchByKeywords + this.data.searchValue;
      if (this.data.searchValue) {
         wx.request({
            url: urlData,
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  let dataListArr = res.data.rows;
                  for (let i = 0; i < res.data.rows.length; i++) {
                     dataListArr[i].duration = parseInt(res.data.rows[i].duration / 60) + ":" + (parseInt(res.data.rows[i].duration % 60 / 10) ? res.data.rows[i].duration % 60 : "0" + res.data.rows[i].duration % 60);
                  }
                  that.setData({
                     searchCursor: 1,
                     dataList: dataListArr
                  })
                  if (res.data.count > 0) {
                     let storageArr = wx.getStorageSync("search") || [];
                     if (storageArr.indexOf(that.data.searchValue) == -1) {
                        storageArr.unshift(that.data.searchValue);
                     }
                     wx.setStorageSync("search", storageArr);
                  } else if (res.data.count == 0) {
                     that.setData({
                        searchDivider: true
                     })
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },
   // 点击历史数据
   handleClick: function(event) {
      var searchValue = event.currentTarget.dataset.storageValue;
      this.setData({
         searchValue: searchValue
      })
   },
   // 点击清除按钮
   clearTap: function(event) {
      this.setData({
         searchValue: "",
         searchCursor: 0,
         storageData: wx.getStorageSync('search')
      })
   },
   // 点击搜索按钮
   searchTap: function(event) {
      let that = this;
      if (this.data.searchValue) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.searchByKeywords + this.data.searchValue,
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  let dataListArr = res.data.rows;
                  for (let i = 0; i < res.data.rows.length; i++) {
                     dataListArr[i].duration = parseInt(res.data.rows[i].duration / 60) + ":" + (parseInt(res.data.rows[i].duration % 60 / 10) ? res.data.rows[i].duration % 60 : "0" + res.data.rows[i].duration % 60);
                  }
                  that.setData({
                     searchCursor: 1,
                     dataList: dataListArr
                  })
                  if (res.data.count > 0) {
                     let storageArr = wx.getStorageSync("search") || [];
                     if (storageArr.indexOf(that.data.searchValue) == -1) {
                        storageArr.unshift(that.data.searchValue);
                     }
                     wx.setStorageSync("search", storageArr);
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },
   // 清缓存
   clearStorage: function(event) {
      wx.removeStorageSync("search");
      this.setData({
         storageData: wx.getStorageSync('search')
      })
   },
   // 生命周期函数--监听页面加载
   onLoad: function(options) {
      this.setData({
         authorization: wx.getStorageSync("Authorization"),
         userId: wx.getStorageSync('userId'),
         storageData: wx.getStorageSync('search')
      })
   },
   onHide: function() {
      this.setData({
         searchValue: "",
         searchCursor: 0,
         storageData: wx.getStorageSync('search')
      })
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onShow();
}
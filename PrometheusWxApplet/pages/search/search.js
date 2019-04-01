// pages/search/search.js
var app = getApp();
Page({
   // 页面的初始数据
   data: {
      dataList: [],
      storageData: wx.getStorageSync('search'),
      actionVisible:false,
      searchObjData:[
         {id:1, name: '试题' },
         {id:2, name: '突破' },
      ],
      searchObj:"试题",
      searchValue: "",
      showNoResultImg:false
   },
   // 点击搜索类
   tapSearchObj(){
      this.setData({
         actionVisible:true
      })
   },
   // 隐藏搜索类选择
   tapCancel(){
      this.setData({
         actionVisible: false
      });
   },  
   // 选中某个搜索类 
   clickItem({ detail }) {
      const index = detail.index;
      this.setData({
         searchObj: this.data.searchObjData[index].name,
         actionVisible: false
      })
   },
   // 搜索结果点击跳转到详情
   tapSearchItem: function(event) {
      addSearchStorage(this);
      if (this.data.searchObj == "试题"){
         wx.navigateTo({
            url: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + event.currentTarget.dataset.courseId + "&category=2"
         })
      }else{
         wx.navigateTo({
            url: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + event.currentTarget.dataset.courseId + "&category=1"
         })
      }
      
   },
   // 扫描二维码事件
   tapScan(){
      wx.scanCode({
         onlyFromCamera: false,
         success: function (res) {
            var path = "/" + unescape(res.path);
            wx.navigateTo({
               url: path,
            })
         }
      })
   },
   tapDelete(){
      this.setData({
         searchValue:"",
         dataList: [], 
         showNoResultImg: false,
         storageData: wx.getStorageSync('search')
      })
   },
   // input内容变化监听
   bindInput: function(event) {
      let that = this;
      this.setData({
         searchValue: event.detail.value
      })
      if (this.data.searchObj == "试题" && event.detail.cursor){
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.searchEliteCourseByKeywords,
            data:{
               limit:5,
               offset:0,
               keyword: this.data.searchValue
            },
            header: {
               "Authorization": this.data.authorization
            },
            success(res){
               if(res.statusCode == 200){
                  that.setData({
                     dataList:res.data.rows
                  })
                  showNoResultImg(res.data.count, that);
               }else if(res.statusCode == 409){
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else if (this.data.searchObj == "突破" && event.detail.cursor){
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.searchSpecialCourseByKeywords,
            data: {
               limit: 5,
               offset: 0,
               keyword: this.data.searchValue
            },
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     dataList: res.data.rows
                  })
                  showNoResultImg(res.data.count, that);
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         that.setData({
            dataList: [],
            showNoResultImg: false,
            storageData: wx.getStorageSync('search')
         })
      }
   },

   // 点击历史数据
   catStorageItem: function(event) {
      let that = this;
      var searchValue = event.currentTarget.dataset.storageValue;
      this.setData({
         searchValue: searchValue
      })
      if (this.data.searchObj == "试题") {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.searchEliteCourseByKeywords,
            data: {
               limit: 5,
               offset: 0,
               keyword: this.data.searchValue
            },
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     dataList: res.data.rows
                  })
                  showNoResultImg(res.data.count, that);
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else if (this.data.searchObj == "突破") {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.searchSpecialCourseByKeywords,
            data: {
               limit: 5,
               offset: 0,
               keyword: this.data.searchValue
            },
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     dataList: res.data.rows
                  })
                  showNoResultImg(res.data.count, that);
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else {
         that.setData({
            dataList: [],
            showNoResultImg: false,
            storageData: wx.getStorageSync('search')
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
         storageData: wx.getStorageSync('search')
      })
      wx.setNavigationBarTitle({
         title: '搜索',
      })
   },
   onHide: function() {
      this.setData({
         searchValue: "",
         dataList:[],
         storageData: wx.getStorageSync('search')
      })
   }
})

function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onShow();
}

function addSearchStorage(that){
   let storageArr = wx.getStorageSync("search") || [];
   if (storageArr.indexOf(that.data.searchValue) == -1) {
      storageArr.unshift(that.data.searchValue);
   }
   wx.setStorageSync("search", storageArr);
}

function showNoResultImg(count, that){
   if (count == 0 && that.data.searchValue) {
      that.setData({
         showNoResultImg: true
      })
   } else {
      that.setData({
         showNoResultImg: false
      })
   }
}
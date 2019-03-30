// pages/curriculum/specialDetail/specialDetail.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab:"0",
      typeArr:[
         {name:"专题简介"},
         {name:"专题目录"}
      ],
      specialColumnId:"",
      specialColumnData:"",
      briefData:[],
      specialCourseOffset:0,
      specialCourseCount:0,
      specialCourseData:[],
      specialColumnLoad:false
   },
   handleChange(event) {
      this.setData({
         currentTab: event.detail.key
      });
   },
   tapSpecialCourse(event){
      let dataset = event.currentTarget.dataset;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + dataset.specialCourseId + "&category=1"
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if(options.specialColumnId){
         this.setData({
            specialColumnId: options.specialColumnId
         })
      }
      wx.setNavigationBarTitle({
         title: '专题详情',
      })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
      let that = this;
      if(wx.getStorageSync("token")){
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnById + this.data.specialColumnId,
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {

                  let briefString = new Object(),
                     briefArr = new Array();
                  briefString = res.data.briefImages;
                  briefArr = briefString.split(",");
                  briefArr.pop();

                  that.setData({
                     specialColumnId: res.data.Id,
                     specialColumnData: res.data,
                     briefData: briefArr
                  })

                  wx.request({
                     url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseBySpecialColumnId,
                     data: {
                        limit: 10,
                        offset: that.data.specialCourseOffset,
                        id: res.data.Id,
                     },
                     header: {
                        "Authorization": wx.getStorageSync("Authorization")
                     },
                     success(res) {
                        if (res.statusCode == 200) {
                           that.setData({
                              specialCourseData: res.data.rows,
                              specialCourseCount: res.data.count
                           })
                        } else if (res.statusCode == 409) {
                           getNewToken(res.data.token, that);
                        }
                     }
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome,
         })
      }
      
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      
   },
   onPullDownRefresh(){
      let that = this;
      this.setData({
         specialCourseOffset:0
      })
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnById + this.data.specialColumnId,
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               wx.stopPullDownRefresh();
               let briefString = new Object(),
                  briefArr = new Array();
               briefString = res.data.briefImages;
               briefArr = briefString.split(",");
               briefArr.pop();

               that.setData({
                  specialColumnId: res.data.Id,
                  specialColumnData: res.data,
                  briefData: briefArr
               })

               wx.request({
                  url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseBySpecialColumnId,
                  data: {
                     limit: 10,
                     offset: that.data.specialCourseOffset,
                     id: res.data.Id,
                  },
                  header: {
                     "Authorization": wx.getStorageSync("Authorization")
                  },
                  success(res) {
                     if (res.statusCode == 200) {
                        that.setData({
                           specialCourseData: res.data.rows
                        })
                     } else if (res.statusCode == 409) {
                        getNewToken(res.data.token, that);
                     }
                  }
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   onReachBottom(){
      let that = this;
      if(this.data.specialCourseData.length < this.data.specialCourseCount){
         this.setData({
            specialCourseOffset:this.data.specialCourseOffset + 10,
            specialColumnLoad:true
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseBySpecialColumnId,
            data: {
               limit: 10,
               offset: that.data.specialCourseOffset,
               id: that.data.specialColumnId,
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  wx.hideLoading();
                  that.setData({
                     specialCourseData: that.data.specialCourseData.concat(res.data.rows),
                     specialColumnLoad:false
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
         path: app.globalData.pageUrl.specialColumnDetail + "?specialColumnId=" + this.data.specialColumnId,
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
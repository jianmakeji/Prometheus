var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab:"0",
      typeArr:[
         { name: "简介" },
         {name:"讨论"}
      ],
      eliteCourseData: "",
      eliteCourseId: "",
      category:"",
      commentOffset: 0,
      commentCount:0,
      collectFlag: 0,            //0:未收藏，1:已收藏
      commentValue: "",          //评论内容
      commentData: [],           //评论数据
      commentLoad: false
   },
   // 简介/讨论切换
   handleChange(event){
      this.setData({
         currentTab: event.detail.key
      });
      if(this.data.currentTab == "0"){
         this.setData({
            commentOffset:0
         })
      }
   },
   // 添加至收藏
   collectTap: function(event) {
      let that = this;
      if (this.data.collectFlag) { //取消收藏
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.deleteFavorite,
            data: {
               userId: wx.getStorageSync("userId"),
               category: 2,
               eliteCourseId: this.data.eliteCourseId,
               specialCourseId: 0
            },
            method: "GET",
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  if (res.data.status == 200) {
                     wx.showToast({
                        title: res.data.message
                     })
                     that.setData({
                        collectFlag: 0
                     })
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else { //收藏
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.createFavorite,
            data: {
               userId: wx.getStorageSync("userId"),
               category: 2,
               eliteCourseId: this.data.eliteCourseId,
               specialCourseId: 0
            },
            method: "POST",
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  if (res.data.status == 200) {
                     wx.showToast({
                        title: res.data.message
                     })
                     that.setData({
                        collectFlag: 1
                     })
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },
   // input内容变化监听
   commentChange: function(event) {
      this.setData({
         commentValue: event.detail.value
      })
   },
   // 发表评论
   submitComment: function(event) {
      let that = this;
      if (this.data.commentValue != "") {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.createComment,
            method: "POST",
            data: {
               userId: wx.getStorageSync("userId"),
               category:2,
               specialCourseId:0,
               eliteCourseId: this.data.eliteCourseId,
               content: this.data.commentValue
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  if (res.data.status == 200) {
                     wx.showToast({
                        title: '发表评论成功！',
                     });
                     that.setData({
                        commentValue: "",
                        commentOffset: 0
                     });
                     // 获取评论数据
                     wx.request({
                        url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByEliteCourseId,
                        data:{
                           limit:10,
                           offset: that.data.commentOffset,
                           eliteCourseId: that.data.eliteCourseId
                        },
                        header: {
                           "Authorization": wx.getStorageSync("Authorization")
                        },
                        success(res) {
                           if(res.statusCode == 200){
                              that.setData({
                                 commentData: res.data.rows
                              })
                           } else if (res.statusCode == 409) {
                              getNewToken(res.data.token, that);
                           }
                        }
                     })
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }

            }
         })
      } else {
         wx.showToast({
            title: '您输入的内容为空！',
            icon: "none"
         })
      }
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if (options.scene) { //扫二维码进入
         let arr = new Array();
         arr = decodeURIComponent(options.scene).split("#");
         this.setData({
            eliteCourseId: arr[0],
            category: arr[1]
         })
      } else { //列表点击进入
         this.setData({
            eliteCourseId: options.eliteCourseId,
            category: options.category
         })
      }
      wx.setNavigationBarTitle({
         title: '试题详解',
      })
   },
   onReady(){
      let that = this;
      if (wx.getStorageSync("token")) {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseDataById + this.data.eliteCourseId,
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     eliteCourseData: res.data
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.checkIsFavite,
            data:{
               userId:wx.getStorageSync("userId"),
               category:2,
               specialCourseId:0,
               eliteCourseId: that.data.eliteCourseId
            },
            header:{
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res){
               if (res.statusCode == 200) {
                  if (res.data.status == 200) {
                     if (res.data.message == "未收藏") {
                        that.setData({
                           collectFlag: 0
                        })
                     } else if (res.data.message == "已收藏") {
                        that.setData({
                           collectFlag: 1
                        })
                     }
                  }
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByEliteCourseId,
            data: {
               limit: 10,
               offset: this.data.commentOffset,
               eliteCourseId: that.data.eliteCourseId
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     commentData: res.data.rows,
                     commentCount:res.data.count
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome + '?eliteCourseId=' + this.data.eliteCourseId + "&category=" + this.data.category,
         })
      }
   },
   onShow() {
      
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      let that = this;
      if(this.data.commentData.length < this.data.commentCount){
         this.setData({
            commentOffset:this.data.commentOffset + 10,
            commentLoad:true
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByEliteCourseId,
            data: {
               limit: 10,
               offset: this.data.commentOffset,
               eliteCourseId: that.data.eliteCourseId
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     commentData: that.data.commentData.concat(res.data.rows),
                     commentLoad:false
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function(res) {
      return {
         title: '师道慧享',
         path: app.globalData.pageUrl.eliteCourseDetail + "?eliteCourseId=" + this.data.eliteCourseId + "&category=" + this.data.category,
         success: function(res) {
            wx.showToast({
               title: '转发成功！',
            })
         },
         fail: function(res) {
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
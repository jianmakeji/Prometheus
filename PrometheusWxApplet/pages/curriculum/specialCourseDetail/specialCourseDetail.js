var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab: "0",
      typeArr: [{
            name: "简介"
         },
         {
            name: "讨论"
         }
      ],
      specialCourseId: "",
      category: "",
      specialCourseData: "",
      specialColumnTeacherInfo: "",

      userId: "",
      commentOffset: 0,
      collectFlag: 0, //0:未收藏，1:已收藏
      commentValue: "", //评论内容
      commentData: [], //评论数据
      commentCount: 0,
      commentLoad: false,

      comeByScan: false
   },
   handleChange(event) {
      this.setData({
         currentTab: event.detail.key
      });
   },


   // 添加至收藏
   collectTap: function(event) {
      let that = this;
      if (this.data.collectFlag) { //取消收藏
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.deleteFavorite,
            data: {
               userId: wx.getStorageSync("userId"),
               category: 1,
               eliteCourseId: 0,
               specialCourseId: this.data.specialCourseId
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
               category: 1,
               eliteCourseId: 0,
               specialCourseId: this.data.specialCourseId
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
               category: 1,
               specialCourseId: this.data.specialCourseId,
               eliteCourseId: 0,
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
                        commentValue: ""
                     });
                     // 获取评论数据
                     wx.request({
                        url: app.globalData.serverHost + app.globalData.globalAPI.getCommentBySpecialCourseId,
                        data: {
                           limit: 10,
                           offset: that.data.commentOffset,
                           specialCourseId: that.data.specialCourseId
                        },
                        header: {
                           "Authorization": wx.getStorageSync("Authorization")
                        },
                        success(res) {
                           if (res.statusCode == 200) {
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
   // 获取视频数据
   getCourseData(that) {
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseDataById + that.data.specialCourseId,
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  specialCourseData: res.data
               })
               wx.request({
                  url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnById + res.data.special_column.Id,
                  header: {
                     "Authorization": wx.getStorageSync("Authorization")
                  },
                  success(res) {
                     if (res.statusCode == 200) {
                        that.setData({
                           specialColumnTeacherInfo: res.data.specialColumn.teacher
                        })
                     }
                  }
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   // 获取评论数据
   getCommentData(that) {
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getCommentBySpecialCourseId,
         data: {
            limit: 10,
            offset: that.data.commentOffset,
            specialCourseId: that.data.specialCourseId
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            if (res.statusCode == 200) {
               that.setData({
                  commentData: res.data.rows,
                  commentCount: res.data.count
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },
   // 获取收藏数据
   getFavariteData(that) {
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.checkIsFavite,
         data: {
            userId: wx.getStorageSync("userId"),
            category: 1,
            specialCourseId: that.data.specialCourseId,
            eliteCourseId: 0
         },
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
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
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      if (options.scene) { //扫二维码进入
         let arr = new Array();
         arr = decodeURIComponent(options.scene).split("#");
         this.setData({
            specialCourseId: arr[0],
            category: arr[1],
            comeByScan: true
         })
      } else { //列表点击进入
         this.setData({
            specialCourseId: options.specialCourseId,
            category: options.category,
            comeByScan: false
         })
      }
      wx.setNavigationBarTitle({
         title: '专题详解',
      })
   },
   onReady() {
      let that = this;
      if (wx.getStorageSync("token")) {
         this.setData({
            authorization: wx.getStorageSync("Authorization"),
            userId: wx.getStorageSync("userId"),
         })
         if (this.data.comeByScan) {
            wx.request({
               url: app.globalData.serverHost + app.globalData.globalAPI.authirtyCourse,
               data: {
                  userId: wx.getStorageSync("userId"),
                  specialCourseId: that.data.specialCourseId
               },
               header: {
                  "Authorization": wx.getStorageSync("Authorization")
               },
               success(authirtyRes) {
                  if (authirtyRes.data == 1) {
                     // 视频对应专题已激活
                     that.getCourseData(that);
                     // 获取收藏数据
                     that.getFavariteData(that);
                     // 获取评论数据
                     that.getCommentData(that);
                  } else {
                     // 视频对应专题未激活
                     wx.showToast({
                        title: '该视频对应专题未激活，请绑定师道码后再观看！',
                        icon: "none",
                        duration: 2000
                     })
                     setTimeout(function() {
                        wx.navigateTo({
                           url: app.globalData.pageUrl.bindSpecialColumn
                        })
                     }, 2000)
                  }
               }
            })
         } else {

            // 视频对应专题已激活
            that.getCourseData(that);

            // 获取收藏数据
            that.getFavariteData(that);

            // 获取评论数据
            that.getCommentData(that);
         }


      } else {
         wx.showToast({
            title: '未登录，无法查看更多详情,2秒后跳转至登录界面！',
            icon: "none",
            duration: 2000
         })
         setTimeout(function() {
            wx.redirectTo({
               url: app.globalData.pageUrl.welcome + '?specialCourseId=' + that.data.specialCourseId + "&category=" + that.data.category,
            })
         }, 2000);
      }
   },
   onShow() {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function() {
      let that = this;
      if (this.data.commentCount > this.data.commentData.length) {
         this.setData({
            commentOffset: that.data.commentOffset + 10,
            commentLoad: true
         });
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentBySpecialCourseId,
            data: {
               limit: 10,
               offset: that.data.commentOffset,
               specialCourseId: that.data.specialCourseId
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     commentData: this.data.commentData.concat(res.data.rows),
                     commentLoad: false
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
         path: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + this.data.specialCourseId + "&category=" + this.data.category,
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
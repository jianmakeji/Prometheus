var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab: "0",
      typeArr: [
         { name: "简介" },
         { name: "讨论" }
      ],
      specialCourseId:"",
      category:"",
      specialCourseData: "",
      specialColumnTeacherInfo:"",

      userId: "",
      commentOffset: 0,
      collectFlag: 0,            //0:未收藏，1:已收藏
      commentValue: "",          //评论内容
      commentData: [],           //评论数据
      commentCount: 0,
      loadMore: false
   },
   handleChange(event) {
      this.setData({
         currentTab: event.detail.key
      });
   },


   // 添加至收藏
   collectTap: function (event) {
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
   commentChange: function (event) {
      this.setData({
         commentValue: event.detail.value
      })
   },
   // 发表评论
   submitComment: function (event) {
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
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if (options.scene) { //扫二维码进入
         let arr = new Array();
         arr = options.scene.split("#");
         this.setData({
            specialCourseId: arr[0],
            category: arr[1]
         })
      } else { //列表点击进入
         this.setData({
            specialCourseId: options.specialCourseId,
            category: options.category
         })
      }
   },
   onReady(){
      let that = this;
      if (wx.getStorageSync("token")) {
         this.setData({
            authorization: wx.getStorageSync("Authorization"),
            userId: wx.getStorageSync("userId"),
         })
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseDataById + this.data.specialCourseId,
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
                     success(res){
                        if(res.statusCode == 200){
                           that.setData({
                              specialColumnTeacherInfo: res.data.teacher
                           })
                        }
                     }
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
         // 获取收藏数据
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
            url: app.globalData.pageUrl.welcome + '?specialCourseId=' + this.data.specialCourseId + "&category=" + this.data.category,
         })
      }
   },
   onShow() {
      
   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {
      let that = this;
      if (this.data.commentCount > this.data.commentData.length) {
         this.setData({
            offset: that.data.commentOffset + 10,
            loadMore: true
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
                     commentData: this.data.commentData.concat(res.data.rows)
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      }else{
         wx.showToast({
            title: '无其他数据',
            icon: "none"
         })
      }
   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function (res) {
      return {
         title: '师道慧享',
         path: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + this.data.specialCourseId + "&category=" + this.data.category,
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
var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab: "1",
      typeArr: [
         { name: "简介" },
         { name: "讨论" }
      ],
      specialCourseId:"",
      specialCourseData: "",
      specialColumnTeacherInfo:"",

      userId: "",
      offset: 0,
      collectFlag: 0,            //0:未收藏，1:已收藏
      commentValue: "",          //评论内容
      commentModal: false,       //评论弹出层
      commentData: [],           //评论数据
      commentLenght: 0,
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
                        commentValue: "",
                        offset: 0
                     });
                     // 获取评论数据
                     wx.request({
                        url: app.globalData.serverHost + app.globalData.globalAPI.getCommentBySpecialCourseId,
                        data: {
                           limit: 10,
                           offset: 0,
                           specialCourseId: that.data.specialCourseId
                        },
                        header: {
                           "Authorization": wx.getStorageSync("Authorization")
                        },
                        success(res) {
                           console.log("评论数据", res)
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
   // 取消评论
   tapCancel: function (event) {
      this.setData({
         commentModal: false
      })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(options.specialCourseId)
      if (options.scene) { //扫二维码进入
         this.setData({
            specialCourseId: options.scene
         })
      } else { //列表点击进入
         this.setData({
            specialCourseId: options.specialCourseId
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
               offset: 0,
               specialCourseId: that.data.specialCourseId
            },
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               console.log("评论数据", res)
               if (res.statusCode == 200) {
                  that.setData({
                     commentData: res.data.rows
                  })
               } else if (res.statusCode == 409) {
                  getNewToken(res.data.token, that);
               }
            }
         })
      } else {
         wx.redirectTo({
            url: app.globalData.pageUrl.welcome + '?id=' + this.data.id + "&courseName=" + this.data.courseName,
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
      if (this.data.commentLenght > this.data.offset) {
         this.setData({
            offset: this.data.offset + 10,
            loadMore: true
         });
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&specialCourseId=" + this.data.specialCourseId,
            header: {
               "Authorization": this.data.authorization
            },
            success(res) {
               if (res.statusCode == 200) {
                  that.setData({
                     commentData: that.data.commentData.concat(res.data.rows),
                     loadMore: false
                  });
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
   onShareAppMessage: function (res) {
      return {
         title: '师道慧享',
         path: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + this.data.id + "&courseName=" + this.data.courseName,
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
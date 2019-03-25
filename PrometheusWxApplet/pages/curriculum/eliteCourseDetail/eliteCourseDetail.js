var app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab:"1",
      typeArr:[
         { name: "简介" },
         {name:"讨论"}
      ],
      eliteCourseData: "",



      authorization: "", //token # openid
      id: "",
      userId: "",
      offset: 0,
      videoAddress: "",          //课程视频链接
      describe: "",              //课程介绍
      collectFlag: 0,            //0:未收藏，1:已收藏
      commentValue: "",          //评论内容
      commentModal: false,       //评论弹出层
      commentData: [],           //评论数据
      commentLenght: 0,
      loadMore: false
   },
   handleChange(event){
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
               userId: this.data.userId,
               category: 1,
               courseId: this.data.id,
               articleId: 0
            },
            method: "GET",
            header: {
               "Authorization": wx.getStorageSync("Authorization")
            },
            success(res) {
               console.log(res)
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
               userId: this.data.userId,
               category: 1,
               courseId: this.data.id,
               articleId: 0
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
   //点击评论
   commentBtn: function(event) {
      this.setData({
         commentModal: true
      })
   },
   // input内容变化监听
   bindInput: function(event) {
      this.setData({
         commentValue: event.detail.value
      })
   },
   // 发表评论
   tapOk: function(event) {
      let that = this;
      if (this.data.commentValue != "") {
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.createComment,
            method: "POST",
            data: {
               userId: this.data.userId,
               courseId: this.data.id,
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
                        commentModal: false,
                        commentValue: "",
                        offset: 0
                     });
                     wx.request({
                        url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + that.data.offset + "&courseId=" + that.data.id,
                        header: {
                           "Authorization": that.data.authorization
                        },
                        success(res) {
                           that.setData({
                              commentData: res.data.rows
                           })
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
   tapCancel: function(event) {
      this.setData({
         commentModal: false
      })
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function(options) {
      console.log(options)
      if (options.scene) { //扫二维码进入
         this.setData({
            id: options.scene
         })
      } else { //列表点击进入
         this.setData({
            id: options.eliteCourseId
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
            url: app.globalData.serverHost + app.globalData.globalAPI.getEliteCourseDataById + this.data.id,
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

         // wx.request({
         //    url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + this.data.id,
         //    header: {
         //       "Authorization": this.data.authorization
         //    },
         //    success(res) {
         //       if (res.statusCode == 200) {
         //          that.setData({
         //             commentData: res.data.rows,
         //             commentLenght: res.data.count
         //          })
         //       } else if (res.statusCode == 409) {
         //          getNewToken(res.data.token, that);
         //       }
         //    }
         // })
         // wx.request({
         //    url: app.globalData.serverHost + app.globalData.globalAPI.getCourseData + "/" + this.data.id,
         //    header: {
         //       "Authorization": this.data.authorization
         //    },
         //    success(res) {
         //       if (res.statusCode == 200) {
         //          that.setData({
         //             courseName: res.data.name,
         //             videoAddress: res.data.videoAddress,
         //             describe: res.data.describe,
         //             courseTypeAndSpecial: res.data.course_type.name + "·" + res.data.special_column.name
         //          })
         //          wx.setNavigationBarTitle({
         //             title: res.data.name
         //          })
         //       } else if (res.statusCode == 409) {
         //          getNewToken(res.data.token, that);
         //       }
         //    }
         // })
         // wx.request({
         //    url: app.globalData.serverHost + app.globalData.globalAPI.checkIsFavite + "userId=" + this.data.userId +
         //       "&category=1&courseId=" + this.data.id + "&articleId=0",
         //    header: {
         //       "Authorization": this.data.authorization
         //    },
         //    success(res) {
         //       if (res.statusCode == 200) {
         //          if (res.data.status == 200) {
         //             if (res.data.message == "未收藏") {
         //                that.setData({
         //                   collectFlag: 0
         //                })
         //             } else if (res.data.message == "已收藏") {
         //                that.setData({
         //                   collectFlag: 1
         //                })
         //             }
         //          }
         //       } else if (res.statusCode == 409) {
         //          getNewToken(res.data.token, that);
         //       }
         //    }
         // })
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
   onReachBottom: function() {
      let that = this;
      if (this.data.commentLenght > this.data.offset) {
         this.setData({
            offset: this.data.offset + 10,
            loadMore: true
         });
         wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + this.data.id,
            header: {
               "Authorization": wx.getStorageSync("Authorization")
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
   onShareAppMessage: function(res) {
      return {
         title: '师道慧享',
         path: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + this.data.id + "&courseName=" + this.data.courseName,
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
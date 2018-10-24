var fileData = require('../../../utils/xyData.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization: "", //token
        id: "",
        userId: "",
        offset: 0,
        courseTypeAndSpecial: "", //课程所属
        videoAddress: "", //课程视频链接
        describe: "", //课程介绍
        collectFlag: 0, //0:未收藏，1:已收藏
        commentValue: "",
        commentModal: false,
        commentData: [],
        commentLenght: 0,
        loadMore: false,
        loginModal: false,
        tex: ""
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
                    "Authorization": this.data.authorization
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
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
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
                    "Authorization": this.data.authorization
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
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
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
                    "Authorization": this.data.authorization
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
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
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
    userInfoHandler() {
        let that = this;
        that.setData({
            loginModal: false,
            // authorization: wx.getStorageSync("Authorization")
        })
        wx.showNavigationBarLoading();
        wx.hideTabBar();
        wx.getUserInfo({
            success(res) {
                wx.setStorageSync("nickName", res.userInfo.nickName);
                wx.setStorageSync("avatarUrl", res.userInfo.avatarUrl);
                wx.setStorageSync("gender", res.userInfo.gender);
                wx.setStorageSync("province", res.userInfo.province);
                wx.setStorageSync("city", res.userInfo.city);
                wx.setStorageSync("country", res.userInfo.country);
                wx.login({
                    withCredentials: true,
                    success: function(res) {
                        if (res.code) {
                            wx.request({
                                url: app.globalData.serverHost + app.globalData.globalAPI.getWxCode,
                                data: {
                                    jscode: res.code
                                },
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function(res) {
                                    wx.setStorageSync("openid", res.data.openid);
                                    that.setData({
                                        userInfo: wx.getStorageSync("userInfo")
                                    })
                                    app.data.openid = res.data.openid;

                                    wx.request({
                                        url: app.globalData.serverHost + app.globalData.globalAPI.createUser,
                                        method: "POST",
                                        data: {
                                            nickName: wx.getStorageSync("nickName"),
                                            avatarUrl: wx.getStorageSync("avatarUrl"),
                                            gender: wx.getStorageSync("gender"),
                                            province: wx.getStorageSync("province"),
                                            city: wx.getStorageSync("city"),
                                            country: wx.getStorageSync("country"),
                                            openId: wx.getStorageSync("openid"),
                                        },
                                        success(res) {
                                            wx.hideNavigationBarLoading();
                                            wx.showTabBar();
                                            wx.setStorageSync("token", res.data.token);
                                            wx.setStorageSync("userId", res.data.userId);
                                            wx.setStorageSync("userName", res.data.userId);
                                            wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                                            that.setData({
                                                // loginModal: false,
                                                authorization: wx.getStorageSync("Authorization")
                                            })
                                            // ==================================================
                                            that.setData({
                                                authorization: wx.getStorageSync("Authorization"),
                                                userId: wx.getStorageSync("userId"),
                                            })
                                            wx.request({
                                                url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + that.data.offset + "&courseId=" + that.data.id,
                                                header: {
                                                    "Authorization": that.data.authorization
                                                },
                                                success(res) {
                                                    that.setData({
                                                        commentData: res.data.rows,
                                                        commentLenght: res.data.count
                                                    })
                                                }
                                            })
                                            wx.request({
                                                url: app.globalData.serverHost + app.globalData.globalAPI.getCourseData + "/" + that.data.id,
                                                header: {
                                                    "Authorization": that.data.authorization
                                                },
                                                success(res) {
                                                    that.setData({
                                                        videoAddress: res.data.videoAddress,
                                                        describe: res.data.describe,
                                                        courseTypeAndSpecial: res.data.course_type.name + "·" + res.data.special_column.name
                                                    })
                                                }
                                            })
                                            wx.request({
                                                url: app.globalData.serverHost + app.globalData.globalAPI.checkIsFavite + "userId=" + that.data.userId +
                                                    "&category=1&courseId=" + that.data.id + "&articleId=0",
                                                header: {
                                                    "Authorization": that.data.authorization
                                                },
                                                success(res) {
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
                                                }
                                            })


                                            // ===================================================

                                        },
                                        fail(err) {
                                            that.setData({
                                                tex: "err"
                                            })
                                        }
                                    })
                                },
                                fail(err) {}
                            })
                        } else {
                            // 否则弹窗显示，showToast需要封装
                            wx.showToast({
                                title: '登陆失败',
                            })
                        }
                    }
                })
            },
            fail: function() {
                // fail
                console.log("获取失败！")
            },
            complete: function() {
                console.log("获取用户信息完成！")
            }
        });


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let that = this;
        this.setData({
            id: options.id,
            courseName: options.courseName
        })
        wx.setNavigationBarTitle({
            title: options.courseName,
        })
        if (wx.getStorageSync("token")) {
            this.setData({
                authorization: wx.getStorageSync("Authorization"),
                userId: wx.getStorageSync("userId"),
            })
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + this.data.id,
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            commentData: res.data.rows,
                            commentLenght: res.data.count
                        })
                    } else if (res.statusCode == 409) {
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                    }
                }
            })
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.getCourseData + "/" + this.data.id,
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            videoAddress: res.data.videoAddress,
                            describe: res.data.describe,
                            courseTypeAndSpecial: res.data.course_type.name + "·" + res.data.special_column.name
                        })
                    } else if (res.statusCode == 409) {
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                    }
                }
            })
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.checkIsFavite + "userId=" + this.data.userId +
                    "&category=1&courseId=" + this.data.id + "&articleId=0",
                header: {
                    "Authorization": this.data.authorization
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
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                    }
                }
            })
        } else {
            this.setData({
                loginModal: true
            })
        }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        this.setData({
            offset: 0
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + that.data.id,
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                if (res.statusCode == 200) {
                    that.setData({
                        commentData: res.data.rows,
                        commentLenght: res.data.count
                    });
                    wx.stopPullDownRefresh();
                } else if (res.statusCode == 409) {
                    wx.setStorageSync("token", res.data.token);
                    wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                }
            }
        })
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
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            commentData: that.data.commentData.concat(res.data.rows),
                            loadMore: false
                        });
                    } else if (res.statusCode == 409) {
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
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
            title: 'Prometheus',
            path: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + this.data.id + "&courseName=" + this.data.courseName,
            success: function(res) {
                wx.showToast({
                    title: '转发成功！',
                })
            },
            fail: function(res) {
                console.log("wee", res);
                wx.showToast({
                    title: '转发失败!',
                    icon: 'none'
                })
            }
        }
    }
})
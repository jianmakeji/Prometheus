// pages/curriculum/curriculum.js
var fileData = require('../../utils/xyData.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization: "",
        loginModal: true,
        currentTab: "0",
        courseType: [],
        JPgrade7_data: [], //七年级精品课程数据
        JPgrade8_data: [], //八年级精品课程数据
        JPgrade9_data: [], //九年级精品课程数据
        ZT_data: [],
        autoHeight: 1020
    },
    // 导航栏切换监听事件
    handleChange: function(event) {
        this.setData({
            currentTab: event.detail.key
        });
        if (event.detail.key == "0") {
            this.setData({
                autoHeight: 402 + 204 * (this.data.JPgrade7_data.length + this.data.JPgrade8_data.length + this.data.JPgrade9_data.length)
            });
        } else {
            this.setData({
                autoHeight: this.data.ZT_data.length * (216 + 10)
            });
        }
    },
    // scroll滑动监听事件
    bindchange: function(event) {
        this.setData({
            currentTab: event.detail.current
        });
        if (event.detail.current == "0") {
            this.setData({
                autoHeight: 402 + 204 * (this.data.JPgrade7_data.length + this.data.JPgrade8_data.length + this.data.JPgrade9_data.length)
            });
        } else {
            this.setData({
                autoHeight: this.data.ZT_data.length *( 216 + 10 )
            });
        }
    },
    //点击专题进行跳转
    catchtap: function(event) {
        let specialColumnId = event.currentTarget.dataset.specialColumnId,
            specialColumnGrade = event.currentTarget.dataset.specialColumnGrade,
            specialColumnName = event.currentTarget.dataset.specialColumnName;
        wx.navigateTo({
            url: '/pages/curriculum/curriculumList/curriculumList?specialColumnId=' + specialColumnId +
                "&specialColumnName=" + specialColumnGrade + "年级·" + specialColumnName
        })
    },
    userInfoHandler() {
        let that = this;
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

                // wx.setStorageSync("userInfo", res.userInfo);
                wx.login({
                    withCredentials: true,
                    success: function(res) {
                        if (res.code) {
                            wx.request({
                                url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx781d229c4c3bd932&secret=5ede9e8e53b095852751ff9b7a0a0e2a&js_code=' + res.code + '&grant_type=authorization_code',
                                data: {},
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    wx.setStorageSync("openid", res.data.openid);
                                    that.setData({
                                        userInfo: wx.getStorageSync("userInfo")
                                    })
                                    app.data.openid = res.data.openid;
                                    wx.request({
                                        url: app.globalData.serverHost + app.globalData.globalAPI.createUser,
                                        method: "POST",
                                        data: {
                                            nickName:wx.getStorageSync("nickName"),
                                            avatarUrl:wx.getStorageSync("avatarUrl"),
                                            gender:wx.getStorageSync("gender"),
                                            province:wx.getStorageSync("province"),
                                            city: wx.getStorageSync("city"),
                                            country:wx.getStorageSync("country"),
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
                                                loginModal: false
                                            })
                                        }
                                    })
                                }
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
    onLoad: function(options) {

        wx.showNavigationBarLoading();
        let that = this;
        this.setData({
            authorization: wx.getStorageSync("Authorization")
        })
        if (wx.getStorageSync("openid")) {
            this.setData({
                loginModal: false
            })
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.getCourseTypeData,
                data: {
                    limit: 10,
                    offset: 0
                },
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200){
                        that.setData({
                            courseType: res.data.rows
                        });
                        wx.request({
                            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnsByCourseType,
                            data: {
                                courseType: res.data.rows[0].Id
                            },
                            header: {
                                "Authorization": that.data.authorization
                            },
                            success(res) {
                                let grade7arr = [],
                                    grade8arr = [],
                                    grade9arr = [];
                                for (let i = 0; i < res.data.length; i++) {
                                    if (res.data[i].grade == 7) {
                                        grade7arr.push(res.data[i]);
                                    } else if (res.data[i].grade == 8) {
                                        grade8arr.push(res.data[i]);
                                        that.setData({
                                            JPgrade8_data: that.data.JPgrade8_data.push(res.data[i])
                                        })
                                    } else if (res.data[i].grade == 9) {
                                        grade9arr.push(res.data[i]);
                                        that.setData({
                                            JPgrade9_data: that.data.JPgrade9_data.push(res.data[i])
                                        })
                                    }
                                };
                                that.setData({
                                    JPgrade7_data: grade7arr,
                                    JPgrade8_data: grade8arr,
                                    JPgrade9_data: grade9arr
                                })
                                wx.hideNavigationBarLoading();
                            }
                        });
                        wx.request({
                            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnsByCourseType,
                            data: {
                                courseType: res.data.rows[1].Id
                            },
                            header: {
                                "Authorization": that.data.authorization
                            },
                            success(res) {
                                that.setData({
                                    ZT_data: res.data
                                })
                            }
                        })
                    } else if (res.statusCode == 409){
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        return {
            title: 'Prometheus',
            path: '/pages/curriculum/curriculum',
            success: function(res) {
                // 转发成功
                // console.log("转发成功",res);
            },
            fail: function(res) {
                // 转发失败
                // console.log("转发失败", res);
            }
        }
    }
})
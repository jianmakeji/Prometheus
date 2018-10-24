// pages/welcome/welcome.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        courseDetailId:"",
        courseName : ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        if (options.id && options.courseName){
            this.setData({
                courseDetailId: options.id,
                courseName: options.courseName
            })
        }
        if (wx.getStorageSync("token")) {
            if(options.id){
                wx.navigateTo({
                    url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + this.data.id + "&courseName=" + this.data.courseName,
                })
            }else{
                wx.switchTab({
                    url: "/pages/curriculum/curriculum",
                })
            }
        }
    },
    userInfoHandler(event){
        let that = this;
        wx.showNavigationBarLoading();
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
                    success: function (res) {
                        if (res.code) {
                            wx.request({
                                url: app.globalData.serverHost + app.globalData.globalAPI.getWxCode,
                                data: {
                                    jscode: res.code
                                },
                                header: {
                                    'content-type': 'application/json'
                                },
                                success: function (res) {
                                    wx.setStorageSync("openid", res.data.openid);
                                    app.data.openId = res.data.openid;
                                    that.setData({
                                        userInfo: wx.getStorageSync("userInfo")
                                    })
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
                                            wx.showTabBar();
                                            wx.setStorageSync("token", res.data.token);
                                            wx.setStorageSync("userId", res.data.userId);
                                            wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                                            that.setData({
                                                authorization: wx.getStorageSync("Authorization")
                                            })

                                            //  =======================================================
                                            wx.hideNavigationBarLoading();
                                            if(that.data.courseDetailId){
                                                wx.reLaunch({
                                                    url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + that.data.courseDetailId + "&courseName=" + that.data.courseName,
                                                })
                                            }else{
                                                wx.switchTab({
                                                    url: "/pages/curriculum/curriculum",
                                                })
                                            }
                                            // ===================================================
                                        },
                                        fail(err) { }
                                    })
                                },
                                fail(err) { }
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
            fail: function () {
                // fail
                console.log("获取失败！")
            },
            complete: function () {
                console.log("获取用户信息完成！")
            }
        });
    }
})
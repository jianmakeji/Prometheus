// pages/index/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    userInfoHandler() {
        wx.getUserInfo({
            success(res) {
                console.log("获取成功！", res.userInfo);
                // app.userInfo.username = "";
                // app.userInfo.password = "";
                // app.userInfo.mobile = "";

                app.globalData.userInfo.nickName = res.userInfo.nickName;
                app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl;
                app.globalData.userInfo.gender = res.userInfo.gender;
                app.globalData.userInfo.province = res.userInfo.province;
                app.globalData.userInfo.city = res.userInfo.city;
                app.globalData.userInfo.country = res.userInfo.country;

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
                                success: function(res) {
                                    console.log("获取openId", res);
                                    app.globalData.userInfo.openId = res.data.openid;
                                    wx.request({
                                        url: app.globalData.serverHost + app.globalData.globalAPI.createUser,
                                        method:"POST",
                                        data:{
                                            openId: app.globalData.userInfo.openId,
                                            nickName: app.globalData.userInfo.nickName,
                                            avatarUrl: app.globalData.userInfo.avatarUrl,
                                            gender: app.globalData.userInfo.gender,
                                            province: app.globalData.userInfo.province,
                                            city: app.globalData.userInfo.city,
                                            country: app.globalData.userInfo.country,
                                            mobile: app.globalData.userInfo.mobile
                                        },
                                        success(res) {
                                            console.log("================",res);
                                            // wx.switchTab({
                                            //     url: '/pages/curriculum/curriculum',
                                            // })
                                        }
                                    })
                                }
                            })
                        } else {
                            // 否则弹窗显示，showToast需要封装

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
    onShareAppMessage: function() {

    }
})
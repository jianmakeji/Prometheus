// pages/curriculum/curriculum.js
var app = getApp();
Page({
    data: {
        authorization: "",
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
                autoHeight: this.data.ZT_data.length * (216 + 10)
            });
        }
    },
    //点击专题进行跳转
    catchtap: function(event) {
        let specialColumnId = event.currentTarget.dataset.specialColumnId,
            specialColumnGrade = event.currentTarget.dataset.specialColumnGrade,
            specialColumnName = event.currentTarget.dataset.specialColumnName;
        wx.navigateTo({
            url: app.globalData.pageUrl.curriculumList + "?specialColumnId=" + specialColumnId +
                "&specialColumnName=" + specialColumnGrade + "年级·" + specialColumnName
        })
    },
    onLoad: function(options) {
        let that = this;
        this.setData({
            authorization: wx.getStorageSync("Authorization")
        })
        if (wx.getStorageSync("token")) {
            wx.showNavigationBarLoading();
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.getCourseTypeData,
                data: {
                    limit: 10,
                    offset: 0
                },
                method: "GET",
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            courseType: res.data.rows
                        });
                        wx.request({
                            url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnsByCourseType,
                            data: {
                                courseType: res.data.rows[0].Id,
                                thumbName: "thumb_300_300"
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
                                    } else if (res.data[i].grade == 9) {
                                        grade9arr.push(res.data[i]);
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
                                courseType: res.data.rows[1].Id,
                                thumbName: "thumb_300_300"
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
                    } else if (res.statusCode == 409) {
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                    }
                }
            })
        } else {
            wx.redirectTo({
                url: app.globalData.pageUrl.welcome,
            })
        }
    },
    onShow: function() {
        if (wx.getStorageSync("token") == "") {
            wx.redirectTo({
                url: app.globalData.pageUrl.welcome,
            })
        }
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function(res) {
        return {
            title: '私塾',
            path: app.globalData.pageUrl.curriculum,
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
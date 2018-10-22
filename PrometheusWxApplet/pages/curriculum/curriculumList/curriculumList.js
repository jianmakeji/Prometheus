// pages/curriculum/curriculumList/curriculumList.js
var fileData = require('../../../utils/xyData.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization: "",
        courseType: "",
        classTitle: "",
        specialColumnId: "",
        specialColumnName: "", //标题
        dataList: []
    },
    clickClass: function(event) {
        wx.navigateTo({
            url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.courseId + "&courseName=" + event.currentTarget.dataset.courseName
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            specialColumnId: options.specialColumnId
        })
        wx.setNavigationBarTitle({
            title: options.specialColumnName,
        })

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
        let that = this;
        wx.showNavigationBarLoading();
        this.setData({
            authorization: wx.getStorageSync("Authorization")
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCourseBySpecialColumnId.replace(":id", this.data.specialColumnId),
            data:{
                thumbName: "thumb_300_300"
            },
            header: {
                "Authorization": that.data.authorization
            },
            success(res) {
                if (res.statusCode == 200) {
                    wx.hideNavigationBarLoading();
                    let dataListArr = res.data.rows;
                    for (let i = 0; i < res.data.rows.length; i++) {
                        dataListArr[i].duration = parseInt(res.data.rows[i].duration / 60) + ":" + (parseInt(res.data.rows[i].duration % 60 / 10) ? res.data.rows[i].duration % 60 : "0" + res.data.rows[i].duration % 60);
                    }
                    that.setData({
                        dataList: dataListArr
                    })
                } else if (res.statusCode == 409) {
                    wx.setStorageSync("token", res.data.token);
                    wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                }
            }
        })
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
        return {
            title: 'Prometheus',
            path: '/pages/curriculum/curriculumList/curriculumList',
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
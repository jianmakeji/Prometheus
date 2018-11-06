// pages/Myinfo/myCollect/myCollect.js
var app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        currentTab: "0",
        autoHeight: 400,
        courseDataList: [],
        articleDataList: [],
        courseOffset: 0,
        articleOffset: 0,
        userId: ""
    },
    handleChange: function(event) {
        this.setData({
            currentTab: event.detail.key,
            autoHeight: 400 + this.data.courseDataList.length * 100
        });
    },
    bindchange: function(event) {
        this.setData({
            currentTab: event.detail.current,
            autoHeight: 400 + this.data.courseDataList.length * 100
        });
    },
    // 课程详情
    clickClass: function(event) {
        wx.navigateTo({
            url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.courseId + "&courseName=" + event.currentTarget.dataset.courseName
        })
    },
    // 好文详情
    clickArticle: function(event) {
        wx.navigateTo({
            url: '/pages/pieceShare/pieceShareList/pieceShareList?classId=' + event.currentTarget.dataset.classId +
                "&classTitle=" + event.currentTarget.dataset.classTitle,
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '我的收藏',
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
        this.setData({
            autoHeight: 400 + this.data.courseDataList.length * 100,
            userId: wx.getStorageSync("userId"),
            authorization: wx.getStorageSync("Authorization")
        });
        // 获取课程收藏数据
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategoryAndUserid + this.data.courseOffset + "&category=1&thumbName=thumb_300_300&userId=" + this.data.userId,
            method: "GET",
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                let dataListArr = res.data.rows;
                for (let i = 0; i < res.data.rows.length; i++) {
                    dataListArr[i].course.duration = parseInt(res.data.rows[i].course.duration / 60) + ":" + (parseInt(res.data.rows[i].course.duration % 60 / 10) ? res.data.rows[i].course.duration % 60 : "0" + res.data.rows[i].course.duration % 60);
                }
                that.setData({
                    courseDataList: dataListArr
                })
            }
        })
        // 获取文章收藏数据
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategoryAndUserid + this.data.articleOffset + "&category=2&userId=" + this.data.userId,
            method: "GET",
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                that.setData({
                    articleDataList: res.data.rows
                })
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

    }
})
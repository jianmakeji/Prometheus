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
        console.log(event)
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
        console.log("onLoad");
        let that = this;
        wx.setNavigationBarTitle({
            title: '我的收藏',
        })
        this.setData({
            autoHeight: 400 + this.data.courseDataList.length * 100,
            userId: wx.getStorageSync("userId"),
            authorization: wx.getStorageSync("Authorization")
        });
        // 获取课程收藏数据
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategoryAndUserid + this.data.courseOffset + "&category=1&userId=" + this.data.userId,
            method: "GET",
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                console.log("获取课程", res);
                if (res.statusCode == 200) {
                    let dataListArr = res.data.rows;
                    for (let i = 0; i < res.data.rows.length; i++) {
                        dataListArr[i].course.duration = parseInt(res.data.rows[i].course.duration / 60) + ":" + (parseInt(res.data.rows[i].course.duration % 60 / 10) ? res.data.rows[i].course.duration % 60 : "0" + res.data.rows[i].course.duration % 60);
                    }
                    that.setData({
                        courseDataList: dataListArr
                    })
                }
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
                console.log("获取文章", res);
                that.setData({
                    articleDataList: res.data.rows
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let that = this;
        // 获取课程收藏数据
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getFavoriteByCategoryAndUserid + this.data.courseOffset + "&category=1&userId=" + this.data.userId,
            method: "GET",
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                console.log("获取课程", res);
                that.setData({
                    courseDataList: res.data.rows
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
                console.log("获取文章", res);
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
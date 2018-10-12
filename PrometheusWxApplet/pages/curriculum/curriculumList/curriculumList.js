// pages/curriculum/curriculumList/curriculumList.js
var fileData = require('../../../utils/xyData.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization:"",
        courseType: "",
        classTitle: "",
        specialColumnName:"",   //标题
        dataList: []
    },
    clickClass: function(event) {
        console.log(event.currentTarget.dataset);
        wx.navigateTo({
            url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.courseId + "&courseName=" + event.currentTarget.dataset.courseName
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        this.setData({
            authorization: wx.getStorageSync("Authorization")
        })
        wx.setNavigationBarTitle({
            title: options.specialColumnName,
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCourseBySpecialColumnId.replace(":id", options.specialColumnId),
            header:{
                "Authorization": that.data.authorization
            },
            success(res){
                that.setData({
                    dataList: res.data.rows
                })
            }
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
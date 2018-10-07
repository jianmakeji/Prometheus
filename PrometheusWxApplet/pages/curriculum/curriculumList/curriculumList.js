// pages/curriculum/curriculumList/curriculumList.js
var fileData = require('../../../utils/xyData.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classType: "",
        classTitle: "",
        dataList: []
    },
    clickClass: function(event) {
        wx.navigateTo({
            url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.id + "&classType=" + this.data.classType + "&courseTitle=" + event.currentTarget.dataset.title
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.specialColumnTitle,
        })
        this.setData({
            classType: options.specialColumnTitle,
            dataList: fileData.xyData().videoList
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
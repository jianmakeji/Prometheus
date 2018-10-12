// pages/curriculum/curriculumDetail/curriculumDetail.js
var fileData = require('../../../utils/xyData.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization:"",   //token
        id: "", 
        courseTypeAndSpecial:"",          //课程所属
        videoAddress: "",       //课程视频链接
        describe:"",            //课程介绍
        collectFlag: 0 //0:未收藏，1:已收藏
    },
    // 添加至收藏
    collectTap: function(event) {
        if (this.data.collectFlag) {
            this.setData({
                collectFlag: 0
            })
        } else {
            this.setData({
                collectFlag: 1
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */ 
    onLoad: function(options) {
        let that = this;
        this.setData({
            authorization: wx.getStorageSync("Authorization")
        })
        console.log("++++++++++++++",options);
        this.setData({
            id: options.id
        })
        wx.setNavigationBarTitle({
            title: options.courseName,
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCourseData + "/" + options.id,
            header:{
                "Authorization": this.data.authorization
            },
            success(res){
                console.log("=============",res);
                that.setData({
                    videoAddress: res.data.videoAddress,
                    describe: res.data.describe,
                    courseTypeAndSpecial: res.data.course_type.name + "·" + res.data.special_column.name
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
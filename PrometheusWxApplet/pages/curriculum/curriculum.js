// pages/curriculum/curriculum.js
var fileData = require('../../utils/xyData.js');
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: "0",
        courseType:[],
        jingpin_dataList: [], 
        zhuanti_dataList: [],
        autoHeight: 2400
    },
    // 导航栏切换监听事件
    handleChange: function(event) {
        this.setData({
            currentTab: event.detail.key
        });
        if (event.detail.key == "0") {
            this.setData({
                autoHeight: 2400
            });
        } else {
            this.setData({
                autoHeight: 1020
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
                autoHeight: 2400
            });
        } else {
            this.setData({
                autoHeight: 1020
            });
        }
    },
    //点击专题进行跳转
    //data-course-type-id='1' data-course-type-name='{{item.name}}'  data-course-type-grade='{{item.grade}}'
    catchtap: function(event) {
        wx.navigateTo({
            url: '/pages/curriculum/curriculumList/curriculumList?specialColumnId=' + event.currentTarget.dataset.specialColumnId +
                "&specialColumnTitle=" + event.currentTarget.dataset.specialColumnGrade + "·" + event.currentTarget.dataset.specialColumnName
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            courseType:fileData.xyData().courseType,                    //模拟课程类型数据
            jingpin_dataList: fileData.xyData().jingpin_course_type,    //模拟精品课程数据
            zhuanti_dataList: fileData.xyData().zhuanti_course_type,    //模拟专题突破数据
        });
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
            title: '心一教育',
            path: '/pages/curriculum/curriculum',
            success: function (res) {
                // 转发成功
                // console.log("转发成功",res);
            },
            fail: function (res) {
                // 转发失败
                // console.log("转发失败", res);
            }
        }
    }
})
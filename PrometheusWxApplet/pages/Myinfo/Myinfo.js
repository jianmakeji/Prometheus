// pages/Myinfo/Myinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        shouquan: 0,
        nickname: "",
        headimgurl: ""
    },
    //扫一扫
    scanClick: function(event) {
        wx.scanCode({
            onlyFromCamera: false,
            success: function(res) {
                console.log(res);
            }
        })
    },
    myCollect: function(event) {
        wx.navigateTo({
            url: '/pages/Myinfo/myCollect/myCollect',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (wx.getStorageSync("openid")) {
            this.setData({
                shouquan:1,
                headimgurl: wx.getStorageSync("avatarUrl"),
                nickname: wx.getStorageSync("nickName")
            })
        }else{
            this.setData({
                shouquan: 0
            })
        }
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
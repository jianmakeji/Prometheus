// pages/Myinfo/Myinfo.js
let app = getApp();
Page({
    
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
            url: app.globalData.pageUrl.myCollect,
        })
    },
    clearStorageClick: function(event) {
        wx.clearStorageSync();
        wx.showToast({
            title: '清除缓存成功',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        if (wx.getStorageSync("token")) {
            this.setData({
                shouquan: 1,
                headimgurl: wx.getStorageSync("avatarUrl"),
                nickname: wx.getStorageSync("nickName")
            })
        }else{
            this.setData({
                shouquan: 0
            })
        }
    }
})
// pages/search/search.js
var app = getApp();
Page({
    // 页面的初始数据
    data: {
        searchCursor: "",
        dataList: [],
        storageData: "",
        searchValue: "",
        userId: ""
    },
    // 搜索结果点击跳转到详情
    clickClass: function(event) {
        wx.navigateTo({
            url: '/pages/curriculum/curriculumDetail/curriculumDetail?id=' + event.currentTarget.dataset.id + "&courseType=" + event.currentTarget.dataset.courseType + "&courseName=" + event.currentTarget.dataset.courseName
        })
    },
    // input内容变化监听
    bindInput: function(event) {
        this.setData({
            searchValue: event.detail.value,
            storageData: wx.getStorageSync('search')
        })
        if (event.detail.cursor == 0) {
            this.setData({
                searchCursor: 0,
                storageData: wx.getStorageSync('search')
            })
        }
    },
    // 点击搜索历史数据
    handleClick: function(event) {
        var searchValue = event.currentTarget.dataset.storageValue;
        this.setData({
            searchValue: searchValue
        })
    },
    // 点击清除按钮
    clearTap: function(event) {
        this.setData({
            searchValue: "",
            searchCursor: 0,
            storageData: wx.getStorageSync('search')
        })
    },
    // 点击input旁边搜索按钮
    searchTap: function(event) {
        let that = this;
        if (this.data.searchValue) {
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.searchByKeywords + this.data.searchValue,
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    if (res.statusCode == 200) {
                        that.setData({
                            searchCursor: 1,
                            dataList: res.data.rows
                        });
                        if (res.data.count > 0) {
                            let storageArr = wx.getStorageSync("search") || [];
                            if (storageArr.indexOf(that.data.searchValue) == -1) {
                                storageArr.unshift(that.data.searchValue);
                            }
                            wx.setStorageSync("search", storageArr);
                        }
                    } else if (res.statusCode == 409){
                        wx.setStorageSync("token", res.data.token);
                        wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                    }
                }
            })


        }
    },
    // 清缓存
    clearStorage: function(event) {
        wx.removeStorageSync("search");
        this.setData({
            storageData: wx.getStorageSync('search')
        })
    },
    getphonenumber:function(event){
        console.log(event)
    },
    // 生命周期函数--监听页面加载
    onLoad: function(options) {
        console.log("onLoad")
        this.setData({
            authorization: wx.getStorageSync("Authorization"),
            userId: wx.getStorageSync('userId'),
            storageData: wx.getStorageSync('search')
        })
    },
    onReady:function(){
        console.log("onReady")
    },
    onShow:function(){
        console.log("onShow")
    }
})
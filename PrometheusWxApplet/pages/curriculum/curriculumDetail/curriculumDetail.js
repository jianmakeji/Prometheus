var fileData = require('../../../utils/xyData.js')
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        authorization:"",                   //token
        id: "", 
        offset:0,
        courseTypeAndSpecial:"",          //课程所属
        videoAddress: "",               //课程视频链接
        describe:"",                    //课程介绍
        collectFlag: 0 ,                //0:未收藏，1:已收藏
        commentValue:"",
        commentModal:false,
        commentData:[],
        commentLenght:0,
        loadMore:false
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
    //点击评论
    commentBtn:function(event){
        this.setData({
            commentModal:true
        })
    },
    // input内容变化监听
    bindInput:function(event){
        this.setData({
            commentValue: event.detail.value
        })
    },
    // 发表评论
    tapOk:function(event){
        let that = this;
        if (this.data.commentValue != ""){
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.createComment, 
                method: "POST",
                data:{
                    userId:this.data.userId,
                    courseId:this.data.id,
                    content: this.data.commentValue
                },
                header: {
                    "Authorization": this.data.authorization
                },
                success(res){
                    if(res.data.status == 200){
                        wx.showToast({
                            title: '发表评论成功！',
                        });
                        that.setData({
                            commentModal: false,
                            commentValue:""
                        });
                        wx.request({
                            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + that.data.offset + "&courseId=" + that.data.id,
                            header: {
                                "Authorization": that.data.authorization
                            },
                            success(res) {
                                that.setData({
                                    commentData: res.data.rows
                                })
                            }
                        })
                    }
                }
            })
        }else{
            wx.showToast({
                title: '您输入的内容为空！',
                icon: "none"
            })
        }
    },
    // 取消评论
    tapCancel:function(event){
        this.setData({
            commentModal: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */ 
    onLoad: function(options) {
        let that = this;
        this.setData({
            authorization: wx.getStorageSync("Authorization"),
            userId: wx.getStorageSync("userId")
        })
        this.setData({
            id: options.id
        })
        wx.setNavigationBarTitle({
            title: options.courseName,
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + this.data.id,
            header:{
                "Authorization": this.data.authorization
            },
            success(res) {
                that.setData({
                    commentData:res.data.rows,
                    commentLenght: res.data.count
                })
            }
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCourseData + "/" + this.data.id,
            header:{
                "Authorization": this.data.authorization
            },
            success(res){
                if (res.statusCode == 200) {
                    that.setData({
                        videoAddress: res.data.videoAddress,
                        describe: res.data.describe,
                        courseTypeAndSpecial: res.data.course_type.name + "·" + res.data.special_column.name
                    })
                } else if (res.statusCode == 409) {
                    wx.setStorageSync("token", res.data.token);
                    wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
                }
            }
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {
        let that = this;
        this.setData({
            offset:0
        })
        wx.request({
            url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + that.data.id,
            header: {
                "Authorization": this.data.authorization
            },
            success(res) {
                that.setData({
                    commentData: res.data.rows,
                    commentLenght: res.data.count
                });
                wx.stopPullDownRefresh();
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        let that = this;
        if(this.data.commentLenght > this.data.offset){
            this.setData({
                offset:this.data.offset + 10,
                loadMore:true
            });
            wx.request({
                url: app.globalData.serverHost + app.globalData.globalAPI.getCommentByCourseId + this.data.offset + "&courseId=" + this.data.id,
                header: {
                    "Authorization": this.data.authorization
                },
                success(res) {
                    that.setData({
                        commentData: that.data.commentData.concat(res.data.rows),
                        loadMore:false
                    });
                }
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
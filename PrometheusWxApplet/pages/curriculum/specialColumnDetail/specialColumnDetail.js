// pages/curriculum/specialDetail/specialDetail.js
const app = getApp();
Page({

   /**
    * 页面的初始数据
    */
   data: {
      currentTab:"1",
      typeArr:[
         {name:"专题简介"},
         {name:"专题目录"}
      ],
      specialColumnId:"",
      specialColumnData:"",
      briefData:[],
      specialCourseData:[],
      loadMore:false
   },
   handleChange(event) {
      this.setData({
         currentTab: event.detail.key
      });
   },
   tapSpecialCourse(event){
      console.log(event.currentTarget.dataset)
      let dataset = event.currentTarget.dataset;
      wx.navigateTo({
         url: app.globalData.pageUrl.specialCourseDetail + "?specialCourseId=" + dataset.specialCourseId + "&specialTeacherAvatar=" + escape(dataset.specialTeacherAvatar) + "&specialTeacherBrief=" + dataset.specialTeacherBrief + "&specialTeacherName=" + dataset.specialTeacherName,
      })
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      if(options.specialColumnId){
         this.setData({
            specialColumnId: options.specialColumnId
         })
      }
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
      let that = this;
      wx.request({
         url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialColumnById + this.data.specialColumnId,
         header: {
            "Authorization": wx.getStorageSync("Authorization")
         },
         success(res) {
            console.log(res)
            if (res.statusCode == 200) {

               let briefString = new Object(),
                  briefArr = new Array();
               briefString = res.data.briefImages;
               briefArr = briefString.split(",");
               briefArr.pop();

               that.setData({
                  specialColumnId: res.data.Id,
                  specialColumnData: res.data,
                  briefData: briefArr
               })

               wx.request({
                  url: app.globalData.serverHost + app.globalData.globalAPI.getSpecialCourseBySpecialColumnId,
                  data: {
                     limit: 10,
                     offset: 0,
                     id: res.data.Id,
                  },
                  header: {
                     "Authorization": wx.getStorageSync("Authorization")
                  },
                  success(res) {
                     if (res.statusCode == 200) {
                        that.setData({
                           specialCourseData: res.data.rows
                        })
                     } else if (res.statusCode == 409) {
                        getNewToken(res.data.token, that);
                     }
                  }
               })
            } else if (res.statusCode == 409) {
               getNewToken(res.data.token, that);
            }
         }
      })
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {
      
   },
})
function getNewToken(token, that) {
   wx.setStorageSync("token", token);
   wx.setStorageSync("Authorization", wx.getStorageSync("token") + "#" + wx.getStorageSync("openid"));
   that.onReady();
}
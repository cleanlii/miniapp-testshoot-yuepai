// miniprogram/pages/divide/divideDetail.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    divideName:'',
    goodList:[{
      auth:'摄影师',
      sex:'男',
      age:21,
      college: '浙江工商大学',avatarUrl:'https://s2.ax1x.com/2019/10/19/KmPp9g.jpg',
      iAdd:false
    }, {
        auth: '摄影爱好者',
        sex: '男',
        age: 24,
        college:'浙江大学',
        avatarUrl: 'https://s2.ax1x.com/2019/10/19/KmPp9g.jpg',
        iAdd: false
      }, {
        auth: '摄影爱好者',
        sex: '女',
        age: 19,
        college: '电子科技大学',
        avatarUrl: 'https://s2.ax1x.com/2019/10/19/KmPp9g.jpg',
        iAdd: false
      }, {
        auth: '摄影工作室',
        sex: '男',
        age: 21,
        college: '浙江传媒学院',
        avatarUrl: 'https://s2.ax1x.com/2019/10/19/KmPp9g.jpg',
        iAdd: false
      }, {
        auth: '摄影师',
        sex: '女',
        age: 20,
        college: '上海交通大学',
        avatarUrl: 'https://s2.ax1x.com/2019/10/19/KmPp9g.jpg',
        iAdd: false
      }],
      item:{
        city: "杭州市",
        readNumber: 0.0,
        area: "江干区",
      imgList: [
        ],
        getInvite: 0.0,
        price: "愿意付费",
        avatarUrl: "https://s2.ax1x.com/2019/10/19/KmPp9g.jpg",
        launchTime: "2019/05/28 23:18:31",
        explain: "我是郭德纲",
        gender: 1.0,
        cameraArea: "浙江工商大学",
        tagList: [
          "小清新"
        ],
        nickName: "郭德纲",
        province: "浙江省",
        openId: "owviJ5a0BWsb65vXjdylbPmfOSDI"
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.setData({
      divideName:options.divideName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  add: function (e) {
    let index = e.currentTarget.dataset.index
    let isAdd = 'goodList[' + index + '].isAdd'
    that.setData({
      [isAdd]: !that.data.goodList[index].isAdd
    })
    if (isAdd) {
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 1000
      })
    } else {
      wx.showToast({
        title: '已取消关注',
        icon: 'none',
        duration: 1000
      })
    }
  },
openHomePage:function(e){
  wx.navigateTo({
    url: '/pages/homePage/homePage?item=' + JSON.stringify(that.data.item),
  })
},
  yp: function (e) {
    wx.showModal({
      title: '邀请提示',
      content: '确定向该用户发送邀请吗',
      showCancel: true,

      confirmText: '确定',
      confirmColor: '#7878a8',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/lanuch/yuePai/yuePai',
          })
        }
      },
    })
  }
})
// pages/lanuch/yuePai/yuePai.js
var that
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    title: '上传',
    disabled: true,
    imgList: [],
    max: 200,
    currentNumber: 0,
    files: [],
    maximage: 3,
    isShow: '',
    explain: '',
    tagList: [],
    checkbox: [{
      value: 0,
      name: '毕业照',
      checked: false,
      hot: true,
    }, {
      value: 1,
      name: '证件照',
      checked: false,
      hot: false,
    }, {
      value: 2,
      name: '美食',
      checked: false,
      hot: false,
    }, {
      value: 3,
      name: '汉服',
      checked: false,
      hot: true,
    }, {
      value: 4,
      name: '古风',
      checked: false,
      hot: true,
    }, {
      value: 5,
      name: '民国',
      checked: false,
      hot: false,
    }, {
      value: 6,
      name: 'cosplay',
      checked: false,
      hot: true,
    },
    {
      value: 7,
      name: '小清新',
      checked: false,
      hot: false,
    },
    {
      value: 8,
      name: '商务',
      checked: false,
      hot: false,
    },{
      value: 9,
      name: 'ins风',
      checked: false,
      hot: true,
    }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
that = this
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
  chooseImage: function (e) {
    that = this;
    if (that.data.files.length >= that.data.maximage) return;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  DelImg: function (e) {
    this.data.files.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      files: this.data.files
    })
  },
  openTagList: function (e) {
    that.setData({
      isShow: 'show'
    })
  },
  hideModal(e) {
    that.setData({
      isShow: ''
    })
  },
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
  },
  getExplain:function(e){
    that.setData({
      explain: e.detail.value
    })
  },
  selected: function (e) {
    let temp = []
    let items = that.data.checkbox
    for (let i = 0; i < items.length; ++i) {
      if (items[i].checked) {
        temp.push(items[i].name)
      }
    }
    that.setData({
      tagList: temp,
      isShow: ''
    })
  },
  launch:function(e){
    that.setData({
      loading: true,
      title: '上传中'
    })
    let userInfo = wx.getStorageSync("userInfo")
    let imgList = []
    for (let i = 0; i < that.data.files.length; ++i) {
      const fileName = that.data.files[i];
      const dotPosition = fileName.lastIndexOf('.');
      const extension = fileName.slice(dotPosition);
      const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}${extension}`;
      wx.cloud.uploadFile({
        cloudPath,
        filePath: fileName,
        success: res => {
          imgList.push(res.fileID)
          if (imgList.length == that.data.files.length) {
            let photoInfo = {
              openId: userInfo.openId,
              launchTime: util.formatTime(new Date()),
              explain: that.data.explain,
              imgList: imgList,
              tagList: that.data.tagList
            }
            wx.cloud.callFunction({
              name: 'workListCURD',
              data: {
                type: 'add',
                photoInfo: photoInfo
              },
              success: res => {
                wx.showToast({
                  title: '上传成功',
                  icon: 'success',
                  duration: 1500
                })
              },
              fail: err => {
                console.log(err)
              },
              complete: res => {
                that.setData({
                  loading: false,
                  title: '上传',
                  files: [],
                  explain: ''
                })
              }
            })
          }

        },
        fail: err => {
          wx.showToast({
            title: '图片上传失败',
            icon: "none",
            duration: 1500
          })
        },
        complete: res => {
        }
      })
    }
  }
})
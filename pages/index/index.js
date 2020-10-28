//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    wx.showLoading({
      title: '',
      mask: true
    })
    app.globalData.url = 'https://minigram.ethgeek.cn/v1'
    if (app.globalData.userInfo) {
      wx.hideLoading()
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    if (!app.globalData.token) {
      this.getcode()
    }
  },
  onGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      // hasUserInfo: true
    })
  },
  getcode () {
    var that = this
    wx.login({
      success (res) {
        if (res.code) {
          that.login(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  login: function (code) {
    console.log(code, 'code')
    wx.request({
      url: app.globalData.url+'/login?code=' + code,
      header: {
        'content-type': 'application/json',
      },
      success (res) {
        console.log(res, 'res')
        console.log('token：=' + res.data.data.token)
        app.globalData.token = res.data.data.token
        wx.hideLoading()
      },
      fail (err) {
        console.log('登陆失败: ', err)
      }
    })
  },
  goHistory: function () {
    wx.navigateTo({
      url: '../ticketList/ticketList'
    })
  },
  goHistoryTicket: function () {
    wx.navigateTo({
      url: '../historyTicket/historyTicket'
    })
  },
  goMyInfo: function () {
    wx.navigateTo({
      url: '../myInfo/myInfo'
    })
  }
})

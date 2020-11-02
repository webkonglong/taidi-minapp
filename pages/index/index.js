//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
  },
  onLoad: function () {
    app.globalData.url = 'https://app01.taidihub.com/v1'
    if (app.globalData.userInfo) {
      wx.hideLoading()
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      if (!app.globalData.token) {
        wx.showLoading({
          title: '',
          mask: true
        })
        this.getcode()
      }
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        if (!app.globalData.token) {
          wx.showLoading({
            title: '',
            mask: true
          })
          this.getcode()
        }
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
          if (!app.globalData.token) {
            wx.showLoading({
              title: '',
              mask: true
            })
            this.getcode()
          }
        }
      })
    }
  },
  onGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
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
    if (!this.data.userInfo) {
      wx.showToast({
        title: '请登陆', 
        icon: 'none', 
        duration: 1000
      })
    } else {
      console.log(1111)
      wx.navigateTo({
        url: '../ticketList/ticketList'
      })
    }
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

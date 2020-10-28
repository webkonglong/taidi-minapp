const app = getApp()
var common = require("../../utils/util.js")

Page({
  data: {
    data: []
  },
  onLoad: function () {
    var self = this
    wx.request({
      url: app.globalData.url+'/userl?token=' + app.globalData.token,
      header: {
        'content-type': 'application/json',
      },
      success (res) {
        console.log('电子小票列表: ', res)
        if (res.data.status === 200) {
          const data = res.data.data
          data.forEach(item => {
            item.created_at = common.dateFunction(item.created_at)
          })
          self.setData({
            data: data.reverse()
          })
        }
      }
    })
  },
  change: function (e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../ticket/ticket?id=${id}`
    })
  }
})
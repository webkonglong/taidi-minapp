const app = getApp()
var common = require("../../utils/util.js")
Page({
  data: {
    data: null,
    total: '--'
  },
  onLoad: function (option) {
    var self = this
    wx.request({
      url: app.globalData.url+'/elerec/'+option.id+'?token=' + app.globalData.token,
      header: {
        'content-type': 'application/json',
      },
      success (res) {
        if (res.data.status === 200) {
          var data = res.data.data
          data.created_at = common.dateFunction(data.created_at)
          var total = res.data.data.items.reduce((x, y) => x + y.amount, 0)
          self.setData({
            data: data,
            total: total
          })
        }
      }
    })
  },
  change: function (e) {
    var tx_hash = e.currentTarget.dataset.tx_hash
    var block_num = e.currentTarget.dataset.block_num
    var upload_at = e.currentTarget.dataset.upload_at

    var value = '?tx_hash=' + tx_hash + '&block_num=' + block_num + '&upload_at=' + upload_at
    wx.navigateTo({
      url: '../blockchainticket/blockchainticket' + value
    })
  },
  goWetax: function () {
    var self = this
    console.log(this.data.data.id)
    wx.request({
      url: app.globalData.url+'/invoice?recid='+this.data.data.id+'&token=' + app.globalData.token,
      header: {
        'content-type': 'application/json',
      },
      success (res) {
        if (res.data.status === 200) {
          self.goMinApp(res.data.data.title_url)
        }
      }
    })
  },
  goMinApp: function (url) {
    wx.navigateToMiniProgram({
      appId: 'wx8280850d07d385eb',
      path: url,
      success(res) {
        // 打开成功
        console.log(res, 'res')
      }
    })
  }
})
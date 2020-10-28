const app = getApp()
var common = require("../../utils/util.js")
Page({
  data: {
    tx_hash: '',
    block_num: '',
    upload_at: '',
    isLoaded: false
  },
  onLoad: function (option) {
    this.setData({
      tx_hash: option.tx_hash,
      block_num: option.block_num,
      upload_at: common.dateFunction(option.upload_at)
    })
  },
  onShow: function () {
    setTimeout(() => {
      this.setData({
        isLoaded: true
      })
    }, 750)
  },
  goBlockChain: function () {
    wx.navigateTo({
      url: `../link/link?hash=${this.data.tx_hash}`
    })
  }
})
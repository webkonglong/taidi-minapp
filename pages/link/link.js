const app = getApp()

Page({
  data: {
    url: ''
  },
  onLoad: function (option) {
    this.setData({
      url: 'https://scan.taidihub.com/#/transaction/hash/' + option.hash
    })
  }
})
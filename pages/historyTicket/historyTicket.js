const app = getApp()

Page({
  data: {
    data: [{
      id: 1,
      name: '生活用品',
      type: '电子发票',
      time: '2020.09.14 周五 10:00',
      amount: 991.10,
      status: '已开票'
    }, {
      id: 2,
      name: '生活用品',
      type: '电子发票',
      time: '2020.09.14 周五 11:00',
      amount: 331.00,
      status: '已开票'
    }, {
      id: 2,
      name: '生活用品',
      type: '电子发票',
      time: '2020.09.14 周五 12:00',
      amount: 442.00,
      status: '已开票'
    }]
  },
  change: function (e) {
    const id = e.target.dataset.id
    wx.navigateTo({
      url: `../ticketInfo/ticketInfo?id=${id}`
    })
  }
})
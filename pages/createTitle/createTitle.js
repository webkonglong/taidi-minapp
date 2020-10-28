const app = getApp()

Page({
  data: {
    type: 0
  },
  changetype: function (e) {
    this.setData({
      type: +e.target.dataset.id
    })
  },
  changeSwitch: function (e) {
    console.log(e.detail.value)
  }
})
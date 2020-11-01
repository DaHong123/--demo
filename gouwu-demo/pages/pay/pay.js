Page({
  data: {
    address: {},
    cart: [],
  },
  onLoad() {
    // 获取地址
    const address = wx.getStorageSync("address")
    const cart = wx.getStorageSync("cart").filter((item) => item.isChecked)
    this.setData({
      address,
      cart,
    })
    this.setMoneyAndCount()
  },
  setMoneyAndCount() {
    let totalMoney = 0
    let totalCount = 0
    this.data.cart.forEach((item) => {
      totalCount += item.goods_num
      totalMoney += item.goods_price * item.goods_num
    })
    this.setData({
      totalCount,
      totalMoney,
    })
  },
  pay() {
    // 判断用户是否登录了，如果登录了，可以直接支付
    // 如果没登录，需要先登录
    const token = wx.getStorageSync("token")
    if (token) {
      console.log("应该支付了")
    } else {
      // 需要先登录
      wx.navigateTo({
        url: "/pages/auth/auth",
      })
    }
  },
})

import { chooseAddress, showModal } from "../../utils/util"
Page({
  /* 
    onLoad
    onShow
    onReady
    onHide
    onUmMount
  */
  data: {
    hasAddress: false,
    address: {},
    cart: [],
    // 全选按钮的选中状态
    checkAll: true,
    totalMoney: 0,
    totalCount: 0,
  },
  onLoad() {
    // 直接去缓存中获取收获地址
    const address = wx.getStorageSync("address")
    if (address) {
      // 有收获地址
      this.setData({
        hasAddress: true,
        address,
      })
    } else {
      this.setData({
        hasAddress: false,
      })
    }
  },
  onShow() {
    // 获取购物车的数据
    const cart = wx.getStorageSync("cart") || []
    this.setData({
      cart: cart,
    })
    this.setMoneyAndCount()
  },
  setMoneyAndCount() {
    let totalMoney = 0
    let totalCount = 0
    this.data.cart.forEach((item) => {
      // 添加一个判断，如果商品没有选中不应该计算价钱
      if (item.isChecked) {
        totalCount += item.goods_num
        totalMoney += item.goods_price * item.goods_num
      }
    })
    this.setData({
      totalCount,
      totalMoney,
    })
  },
  // 用于增加或者减少购物车的数量
  async setCount(e) {
    const { count, id } = e.currentTarget.dataset
    const item = this.data.cart.find((item) => item.goods_id === id)

    // 判断如果是减-1，并且该商品的数量正好是1，需要删除该商品
    if (count === -1 && item.goods_num === 1) {
      // 删除该商品
      // this.data.cart = this.data.cart.filter((item) => item.goods_id !== id)
      // 弹框
      const { confirm } = await showModal({
        title: "温馨提示",
        content: "你确定要删除吗",
      })
      if (confirm) {
        this.data.cart = this.data.cart.filter((item) => item.goods_id !== id)
      }
    } else {
      item.goods_num += count
    }

    this.setData({
      cart: this.data.cart,
    })

    // 重新计算价钱
    this.setMoneyAndCount()
  },
  async getAddress() {
    // 调用微信的接口，获取用户的地址
    try {
      const res = await chooseAddress()
      res.detail =
        res.provinceName + res.cityName + res.countyName + res.detailInfo
      this.setData({
        hasAddress: true,
        address: res,
      })
      // 把收获地址保存到本地
      wx.setStorageSync("address", res)
    } catch (e) {
      wx.showToast({
        title: "获取地址失败",
        icon: "none",
      })
      console.log("获取失败", e)
    }
  },
  checkAllFn() {
    // console.log("全选")
    const checkAll = !this.data.checkAll
    this.data.cart.forEach((item) => {
      item.isChecked = checkAll
    })
    this.setData({
      checkAll: checkAll,
      cart: this.data.cart,
    })

    // 重新算钱
    this.setMoneyAndCount()
  },
  changeFn(e) {
    const { id } = e.currentTarget.dataset
    // 根据id找到对应的那件商品，把商品的isChecked取反
    const item = this.data.cart.find((item) => item.goods_id === id)
    item.isChecked = !item.isChecked

    this.setData({
      cart: this.data.cart,
      // 设置全选
      checkAll: this.data.cart.every((item) => item.isChecked),
    })

    // 重新算钱
    this.setMoneyAndCount()
  },
  onHide() {
    wx.setStorageSync("cart", this.data.cart)
  },
  onUnload() {
    wx.setStorageSync("cart", this.data.cart)
  },
  goPay() {
    if (!this.data.hasAddress) {
      return wx.showToast({
        title: "请选择收货地址",
        icon: "none",
      })
    }

    // 如果购买的商品数量为0，也不应该结算
    if (this.data.totalCount === 0) {
      return wx.showToast({
        title: "请先选择商品在购买",
        icon: "none",
      })
    }

    // 跳转到支付页面
    wx.navigateTo({
      url: "/pages/pay/pay",
    })
  },
})

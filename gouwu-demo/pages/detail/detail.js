// pages/detail/detail.js
import { getGoodsDetail } from "../../request/api"
Page({
  data: {
    detail: {},
  },
  onLoad({ goods_id }) {
    this.goods_id = goods_id
    // console.log(this.goods_id)
    this.loadGoodsDetail()
  },
  async loadGoodsDetail() {
    const res = await getGoodsDetail(this.goods_id)
    console.log(res)
    this.setData({
      detail: res,
    })
  },
  addCart() {
    /* 
      1. 先从本地获取购物车的数据
      2. 判断添加的商品是否在购物车中
      3. 如果有，数量+1
      4. 如果没有，加入购物车
    */
    const {
      goods_id,
      goods_name,
      goods_price,
      goods_small_logo,
    } = this.data.detail
    const cart = wx.getStorageSync("cart") || []
    // 判断添加的商品在数组中是否存在
    const good = cart.find((item) => item.goods_id === goods_id)
    if (good) {
      // 说明数据存在的
      good.goods_num++
    } else {
      // 如果不存在
      cart.push({
        goods_id,
        goods_name,
        goods_price,
        goods_small_logo,
        goods_num: 1,
        isChecked: true,
      })
    }
    // 把cart重新保存到本地
    wx.setStorageSync("cart", cart)

    // 给一个提示
    wx.showToast({
      title: "添加成功",
      mask: true,
    })
  },
})

import { getCategories } from "../../request/api"
Page({
  data: {
    leftMenuData: [],
    rightMenuData: [],
    activeIndex: 0,
    topNum: 0,
  },
  onLoad() {
    this.getCategories()
  },
  async getCategories() {
    wx.showLoading({
      title: "拼命加载中...",
      mask: true,
    })
    // 获取到缓存
    const categories = wx.getStorageSync("categories")
    console.log(categories)
    // 添加判断
    const now = Date.now()
    let res
    if (categories && now - categories.now < 60 * 60 * 1000) {
      // 有缓存，且有效
      res = categories.data
    } else {
      // 发送请求，获取分类数据
      res = await getCategories()
      // 这个数据量太大，不适合渲染
      // 把获取到的res保存到缓存中
      wx.setStorageSync("categories", {
        data: res,
        now: Date.now(),
      })
      // 隐藏
    }
    this.res = res
    const leftMenuData = res.map((item) => item.cat_name)
    const rightMenuData = res[0].children

    // console.log(leftMenuData, rightMenuData)
    this.setData({
      leftMenuData,
      rightMenuData,
    })
    wx.hideLoading()
  },
  tapFn(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      rightMenuData: this.res[index].children,
      // 回到顶部
      topNum: 0,
    })
  },
  goList(e) {
    const { id, name } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/list/list?id=${id}&name=${name}`,
    })
  },
})

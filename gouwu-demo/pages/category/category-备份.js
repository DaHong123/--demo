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
    // 一进来先获取本地的缓存
    const categories = wx.getStorageSync("categories")
    // 本地有缓存, 而且缓存还需要没过期，需要缓存只在10分钟有效
    const now = Date.now()
    const isValid = (now - categories.time) / 1000 / 10 < 10
    if (categories && isValid) {
      this.categories = categories
    } else {
      const res = await getCategories()
      console.log(res)
      this.categories = {
        data: res,
        time: Date.now(),
      }
      // 发送请求获取到数据，应该缓存起来
      wx.setStorageSync("categories", this.categories)
    }
    console.log(this.categories)
    this.setData({
      leftMenuData: this.categories.data.map((item) => item.cat_name),
      rightMenuData: this.categories.data[0].children,
    })
  },
  tapFn(e) {
    console.log(e.currentTarget.dataset)
    const index = e.currentTarget.dataset.index
    this.setData({
      activeIndex: index,
      rightMenuData: this.categories.data[index].children,
      // 回到顶部
      topNum: 0,
    })
  },
})

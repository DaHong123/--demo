import { getNavList, getFloorList, getSwiperList } from "../../request/api"
Page({
  data: {
    // 一开始需要隐藏
    isHidden: true,
    swiperList: [],
    navList: [],
    floorList: [],
  },
  onLoad() {
    this.getSwiperList()
    this.getNavList()
    this.getFloorList()
  },

  async getSwiperList() {
    const res = await getSwiperList()
    this.setData({
      swiperList: res,
    })
  },

  async getNavList() {
    const res = await getNavList()
    this.setData({
      navList: res,
    })
  },
  async getFloorList() {
    const res = await getFloorList()
    this.setData({
      floorList: res,
    })
  },

  // 页面滚动的函数
  onPageScroll(e) {
    // console.log(e)
    if (e.scrollTop >= 300) {
      this.setData({
        isHidden: false,
      })
    } else {
      this.setData({
        isHidden: true,
      })
    }
  },
  goTop() {
    // 滚回到顶部
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 1000,
      // selector: ".menus",
    })
  },
})

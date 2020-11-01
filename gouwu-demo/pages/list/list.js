// pages/list/list.js
import { getGoodsList } from "../../request/api"
Page({
  data: {
    list: [],
    pagenum: 1,
    tabs: [
      { id: 1, title: "综合", isActive: true },
      { id: 2, title: "销量", isActive: false },
      { id: 3, title: "价格", isActive: false },
    ],
    // 是否有更多数据
    hasMore: true,
  },
  onLoad(query) {
    // 设置标题
    wx.setNavigationBarTitle({
      title: query.name,
    })
    // 发送请求，获取列表数据
    this.id = query.id
    this.getGoodsList()
  },
  async getGoodsList() {
    wx.showLoading({
      title: "拼命加载中...",
      mask: true,
    })
    const { pagenum, list } = this.data
    const res = await getGoodsList(this.id, pagenum)
    // 总页数
    const totalPage = Math.ceil(res.total / 10)
    this.setData({
      list: [...list, ...res.goods],
      hasMore: this.data.pagenum < totalPage,
    })
    wx.hideLoading()
    wx.stopPullDownRefresh()
    // console.log("hasMore", this.data.hasMore)
  },
  changeFn(e) {
    // console.log("接受的id", e.detail)
    // 把id对应的isActive改成true，其余的改成false
    const arr = [...this.data.tabs]
    arr.forEach((item) => {
      if (item.id === e.detail) {
        item.isActive = true
      } else {
        item.isActive = false
      }
    })
    this.setData({
      tabs: arr,
    })
  },
  onReachBottom() {
    if (this.data.hasMore) {
      this.setData({
        pagenum: this.data.pagenum + 1,
      })
      this.getGoodsList()
    } else {
      console.log("别啦了，没数据了")
    }
  },
  onPullDownRefresh() {
    // console.log("下拉刷新拉")
    this.setData({
      pagenum: 1,
      list: [],
      hasMore: true,
    })
    this.getGoodsList()
  },
})

// 用于封装项目中的所有的请求
import fetch from "./fetch"

export function getSwiperList() {
  return fetch({
    url: "home/swiperdata",
    method: "get",
  })
}

export function getNavList() {
  return fetch({
    url: "home/catitems",
    method: "get",
  })
}

export function getFloorList() {
  return fetch({
    url: "home/floordata",
    method: "get",
  })
}

// 导出一个获取商品分类的方法
export function getCategories() {
  return fetch({
    url: "categories",
  })
}

// 获取列表数据
export function getGoodsList(cid, pagenum = 1, pagesize = 10) {
  return fetch({
    url: "goods/search",
    data: {
      cid,
      pagenum,
      pagesize,
    },
  })
}

// 获取商品详情页
export function getGoodsDetail(goods_id) {
  return fetch({
    url: "goods/detail",
    data: {
      goods_id,
    },
  })
}

// 自己的服务器的登录
export function requestLogin(data) {
  return fetch({
    url: "users/wxlogin",
    method: "post",
    data: data,
  })
}

// 基于promise封装
const BASE_URL1 = "https://api-hmugo-web.itheima.net/api/public/v1/"
// 后端加了延时
const BASE_URL2 = "https://uinav.com/api/public/v1/"
export default function (options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL2 + options.url,
      method: options.method || "get",
      data: options.data || {},
      headers: options.headers || {},
      success: (res) => {
        const { message, meta } = res.data
        if (meta.status === 200) {
          resolve(message)
        } else {
          reject(res.data)
        }
      },
      fail: (err) => {
        reject(err)
      },
    })
  })
}

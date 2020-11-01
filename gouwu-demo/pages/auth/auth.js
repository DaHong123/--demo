import { login, getUserInfo } from "../../utils/util"
import { requestLogin } from "../../request/api"
Page({
  async login() {
    /* 
      1. 获取code
      2. 获取用户的信息
      3. 发送请求到自己的服务器
    */
    const { code } = await login()
    console.log(code)
    let res
    try {
      res = await getUserInfo()
    } catch (e) {
      return wx.showToast({
        title: "没有授权，登录失败",
        icon: "none",
      })
    }

    // 发送请求，进行登录
    const { encryptedData, rawData, iv, signature } = res
    const { token } = await requestLogin({
      code,
      encryptedData,
      rawData,
      iv,
      signature,
    })
    wx.setStorageSync("token", token)
    wx.navigateBack({})
  },
})

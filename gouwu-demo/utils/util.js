/* 
  提供一些微信官方提供的api，，，把回调函数封装成promise
*/
export function chooseAddress() {
  return new Promise((reslove, reject) => {
    wx.chooseAddress({
      success(res) {
        reslove(res)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

export function showModal(options) {
  return new Promise((resolve, reject) => {
    wx.showModal({
      ...options,
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      },
    })
  })
}

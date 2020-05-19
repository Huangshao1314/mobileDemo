let native = {}
native.post = async(url, params, header, options) => {
  // 登录校验
  // eslint-disable-next-line no-undef
  const userInfo = await getUserInfo()
  if (!userInfo) {
    return Promise.reject()
  }
  return new Promise((resolve, reject) => {
    options = options || {isLoading: false}
    params = params || {}
    header = header || {}
    // eslint-disable-next-line no-undef
    IGTBNative.postRequest(url, params, header, options, data => {
      if (data) {
        resolve(data)
      } else {
        reject(new Error(data, 'kick.out.exception'))
      }
    },
    error => {
      reject(new Error(JSON.parse(error)))
    })
  })
}

export default native

import qs from 'qs'

const httpConfig = {
  timeout: 5000,
  contentType: 'application/x-www-form-urlencoded',
  baseUrl: '',
  reqInterceptors: (config) => {
    // post 传参序列化
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
  },
  resInterceptors: (res) => {
    return res
  }
}

export default httpConfig

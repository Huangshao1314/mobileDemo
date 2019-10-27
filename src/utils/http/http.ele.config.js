import qs from 'qs'
import CU from '../common-utils'
import store from '@/store'
import router from '@/router'

const eleLocalMap = (local) => {
  if (local === 'zh-CN') {
    return 'zh_CN'
  }
  if (local === 'en-US') {
    return 'en_US'
  }
}

const eleConfig = {
  timeout: 5000,
  contentType: 'application/x-www-form-urlencoded;charset=utf-8',
  baseUrl: '',
  reqInterceptors: (config) => {
    var local = store.state.app.language
    var method = config.url
    console.log('method: ' + method + ' ,request:', config.data)
    config.url = '/' + process.env.VUE_APP_BACKEND_NAME + '/_ajax.do'
    let jsonHeader = {
      agent: 'ELEWEB',
      version: '',
      device: store.state.app.device,
      platform: store.state.app.platform,
      page: store.state.app.pageNumber,
      local: eleLocalMap(local),
      rsCipherType: store.state.app.rsCipherType,
      cipherType: store.state.app.cipherType,
      serial: store.state.app.serial,
      mac: store.state.app.mac
    }
    if (config.jsonHeader) {
      Object.assign(jsonHeader, config.jsonHeader)
    }
    // post 传参序列化
    if (config.method === 'post') {
      var data = {
        method: method,
        params: config.data,
        header: jsonHeader
      }

      var json = {
        json: JSON.stringify(data)
      }
      config.data = qs.stringify(json)
      if (config.params) {
        config.params['method'] = method
        config.params['_local'] = eleLocalMap(local)
      } else {
        config.params = {
          method: method,
          _local: eleLocalMap(local)
        }
      }
    }
    return config
  },
  resInterceptors: (res) => {
    if (res.status === 200) {
      console.log('method: ' + res.config.params.method + ' ,response:', res.data)
      // 此处需要处理报错的行为
      if (CU.getErr(res) && (CU.getErr(res).code === 'validation.session_invalid')) {
        // session超时或者用户被踢时，登出
        setTimeout(() => {
          store.dispatch('setLogout')
          router.push({
            name: "LoginPage"
          })
        }, 500)
      }
    }
    return res
  }
}

export default eleConfig

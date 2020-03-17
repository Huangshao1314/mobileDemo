import config from './http.default.config'
import eleConfig from './http.ele.config'
import PQueue from '@/libs/p-queue'
/**
 * Install plugin
 * @param Vue
 * @param axios
 */
let vueHttp = {}
vueHttp.install = (Vue, axios) => {
  if (vueHttp.installed) {
    return
  }
  if (!axios) {
    return
  }

  vueHttp._settings(axios, config)

  Vue.axios = axios

  let eleInstance = axios.create()

  vueHttp._settings(eleInstance, eleConfig)
  let pqueue = new PQueue({concurrency: 6, autoStart: true})
  let limitedEleInstance = {
    post(method, params, options, queueOptions) {
      return pqueue.add(() => {
        return eleInstance.post(method, params, options)
      }, queueOptions)
    },
    getQueue() {
      return pqueue
    }
  }

  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios
      }
    },

    $http: {
      get() {
        return axios
      }
    },

    $ele: {
      get() {
        return eleInstance
      }
    },

    $eleLimit: {
      get() {
        return limitedEleInstance
      }
    }
  })
}

/**
 * vue http设置 - 可以根据config设置指定的axios实例
 * @author Huang SH
 * @param {Object} axios axios实例
 * @param {Object} httpConfig 配置信息
 * @return {Object} 返回一个Promise
 */
vueHttp._settings = function(axios, httpConfig) {
  if (httpConfig.timeout) {
    axios.defaults.timeout = httpConfig.timeout
  }
  if (httpConfig.contentType) {
    axios.defaults.headers.post['Content-Type'] = httpConfig.contentType
  }
  // 请求发送拦截器
  axios.interceptors.request.use(httpConfig.reqInterceptors, (error) => {
    return Promise.reject(error)
  })
  // 请求返回拦截器
  axios.interceptors.response.use(httpConfig.resInterceptors, (error) => {
    return Promise.reject(error)
  })
}
export default vueHttp

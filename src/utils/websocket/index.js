/* eslint-disable no-unused-vars */
import SockJS from 'sockjs-client/dist/sockjs'
let webSocketService = {}
let defaultUrl = '//' + process.env.VUE_APP_MC_DOMAIN + '/' + process.env.VUE_APP_MC_NAME + 'sockjs/messageCenter'
let connected = false
webSocketService.install = (Vue, options) => {
  let ws = null;
  let vue = new Vue()
  let conect = (url) => {
    ws = new SockJS(url)
  }
  /**
   * @param {Object} option 选项
   * @returns {null} 空 建立连接
   */
  Vue.prototype.$webSocketConnect = (option) => {
    let url = defaultUrl + 'userId=' + option.userId + "&custId=" + option.custId + "&ticket=" + option.ticket
    conect(url)
    ws.onopen = () => {
      connected = true
      vue.$bus.emit('ws-open')
    }
    ws.onmessage = (event) => {
      vue.$bus.emit('ws-message', event)
    }
    ws.onclose = (event) => {
      connected = false
      vue.$bus.emit('ws-close', event)
    }
    ws.onerror = (error) => {
      vue.$bus.emit('ws-error', error)
    }
  }
  Vue.prototype.$webSocketDisconnect = () => {
    ws.close()
  }
  Vue.prototype.$webSocketSend = (data) => {
    ws.send(data)
  }
}
export default webSocketService

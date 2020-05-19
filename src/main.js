import Vue from 'vue';
import BrowserUtils from '@/utils/browser-utils.js'

import '@babel/polyfill'
// import 'core-js/stable'
import App from './App.vue';

import * as FastClick from 'fastclick'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';

import Vant from 'vant';
import 'vant/lib/index.css';

import router from './router'
import store from './store'
import i18n from './i18n'

import '@/assets/style/index.css'
import '@/components/svg-icon'

import CU from '@/utils/common-utils'
import webSocket from '@/utils/websocket'
import globalBus from '@/utils/global-bus'
import vueHttp from '@/utils/http'
import './error-log'

import './registerServiceWorker.js'

let scTag = document.createElement('script')
if (BrowserUtils.isAndroid && BrowserUtils.isInIgtbApp) {
  scTag.setAttribute('src', process.env.BASE_URL + 'platform_android/cordova.js')
} else if (BrowserUtils.isIOS && BrowserUtils.isInIgtbApp) {
  scTag.setAttribute('src', process.env.BASE_URL + 'platform_ios/cordova.js')
} else {
  scTag.setAttribute('src', process.env.BASE_URL + 'platform_browser/cordova.js')
}
document.head.appendChild(scTag)

// ios兼容处理
if (/Android/.test(navigator.userAgent)) {
  FastClick.attach(document.body)
}

Vue.use(ElementUI, {
  i18n: (key, opt) => i18n.t(key, opt)
});
Vue.use(Vant)
Vue.use(CU)
Vue.use(webSocket)
Vue.use(globalBus)
Vue.use(vueHttp, axios)

// 添加mock挡板数据拦截请求，模拟返回数据
if (process.env.VUE_APP_MOCK === 'MOCK') {
  require('./mock')
}

// safari浏览器引入css
if (BrowserUtils.isSafari) {
  require('./assets/style/safari.css')
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

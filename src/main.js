import Vue from 'vue';
import '@babel/polyfill'
// import 'core-js/stable'
import App from './App.vue';

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';

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

Vue.use(ElementUI, {
  i18n: (key, opt) => i18n.t(key, opt)
});
Vue.use(CU)
Vue.use(webSocket)
Vue.use(globalBus)
Vue.use(vueHttp, axios)

// 添加mock挡板数据拦截请求，模拟返回数据
if (process.env.VUE_APP_MOCK === 'MOCK') {
  require('./mock')
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

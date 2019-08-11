import Vue from 'vue';
import App from './App.vue';

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui';
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css';

import router from './router'
import store from './store'
import '@/assets/style/index.css'
import '@/components/svg-icon'

import CU from '@/utils/common-utils'
import webSocket from '@/utils/websocket'
import bus from '@/utils/global-bus'
import vueHttp from '@/utils/http'
import './error-log'

Vue.use(ElementUI);
Vue.use(CU)
Vue.use(webSocket)
Vue.use(bus)
Vue.use(vueHttp, axios)

// 添加mock挡板数据拦截请求，模拟返回数据
if (process.env.VUE_APP_MOCK === 'MOCK') {
  require('./mock')
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

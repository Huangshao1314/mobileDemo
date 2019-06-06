import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/data/routes'

Vue.use(Router)

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes

})

// 全局路由钩子注册
router.beforeEach((to, from, next) => {

})

router.afterEach(route => {
  const DEFAULT_TITLE = 'table-demo'
  if (route.meta && route.meta.title) {
    document.title = route.mete.title
  } else {
    document.title = DEFAULT_TITLE
  }
})

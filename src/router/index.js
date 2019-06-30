import Vue from 'vue'
import Router from 'vue-router'

import routes from './data/routes'
import permission from './guards/permission'

Vue.use(Router)

/**
 * 在mode:history模式下项目可部署在非跟目录，需添加base属性
 */
let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: routes

})

// 全局路由钩子注册
router.beforeEach((to, from, next) => {
  permission(to, from, next);
})

router.afterEach(route => {
  const DEFAULT_TITLE = 'vue-demo'
  if (route.meta && route.meta.title) {
    document.title = route.meta.title
  } else {
    document.title = DEFAULT_TITLE
  }
})

export default router

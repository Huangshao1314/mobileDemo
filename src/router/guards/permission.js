/* eslint-disable callback-return */
import store from '@/store'

/**
 *
 * @param {Route} to  目标路由
 * @param {Route} from  当前路由
 * @param {Function} next  next();进行管理的下一个路由的钩子函数，全部钩子执行完毕导航状态为confirmed
 *                         next(false);中断当前导航，url重置到from对于的地址
 *                         next({path:'/'})跳转到指定的不同to的地址，当前导航中断
 * @returns {null} 无返回值
 */
//  eslint-disable-next-line
 const permissionGuards = (to, from, next) => {
  if (to.matched.some((record) => {
    if (record.meta && record.meta.requireAuth) {
      return record.meta.requireAuth
    }
    return false

  })) {
    if (store.state.token) {
      // 登录成功
      next()
    } else {
      // 未登录跳转登录页面
      next({
        path: '/logout',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }

}
export default permissionGuards

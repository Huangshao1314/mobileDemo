import DragColumn from '@/views/drag-column'

/**
 * hidden:false   是否在菜单中显示
 * meta: {
 *    requireAuth, 是否需要登录授权
 *     title  标题
 * }
 *
 * **/
const routes = [
  {
    path: '/drag-column',
    component: DragColumn,
    name: "DragColumn",
    meta: {
      requireAuth: false,
      title: 'drag-column'
    }
  }
]

export default routes

import DragColumn from '@/views/drag-column'
import Layout from '@/views/layout'
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
  },
  {
    path: '/test-demo',
    component: () => import('@/views/test-demo'),
    name: "TestDemo",
    meta: {
      requireAuth: false,
      title: 'TestDemo'
    }
  },
  {
    path: '/tran-group',
    component: () => import('@/views/tran-group'),
    name: "TranGroup",
    meta: {
      requireAuth: false,
      title: 'tran-group'
    }
  },
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          requireAuth: false,
          title: 'home',
          noCache: true
        },
        component: () => import('@/views/home')
      }
    ]
  }
]

export default routes

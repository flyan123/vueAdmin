import Vue from 'vue'
import VueRouter from 'vue-router'
import Layouts from '../layouts'

Vue.use(VueRouter)

// path：路由地址
// redirect：重定向到指定路由
// component：页面对应的组件
// children：设置子路由，二级菜单
// meta：页面的补充，用来声明页面的名称和图标等

const routes = [
  {
    path: '',
    redirect: 'home',
    component: Layouts,
    children: [
      {
        path: '/home',
        meta: { title: '首页', icon: 'el-icon-s-home' },
        component: () => import('../views/home')
      },
      {
        path: 'system',
        meta: { title: '系统管理', icon: 'el-icon-s-home' },
        component: Layouts,
        children: [
          {
            path: 'item1',
            meta: { title: '用户管理', icon: 'el-icon-s-home' },
            component: () => import('../views/system/item1')
          },
          {
            path: 'item2',
            meta: { title: '产品管理', icon: 'el-icon-s-home' },
            component: () => import('../views/system/item2')
          }
        ]
      }
    ]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 前置路由拦截器
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.meta.title
  next()
})

export default router

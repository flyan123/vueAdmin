import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: '首页',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 前置路由拦截器：配置前置路由拦截器动态设置每个页面的浏览器页签名称
router.beforeEach((to, from, next) => {
  // 设置当前页签名称
  document.title = to.name
  next()
})
export default router

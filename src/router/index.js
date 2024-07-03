import Vue from "vue";
import VueRouter from "vue-router";
import Layouts from "../layouts";
import Parent from "../layouts/components/AppContent"

Vue.use(VueRouter);

/**
 *  path: "/login",   ------页面地址
 meta: {
      title: "登录",    ------页面标题
      icon: "el-icon-user-solid",  ------菜单图标
      oneself: true,  ------是否在单独页面打开
      hide: true,  ------是否隐藏改菜单
    },
 component: () => import("../views/login/index.vue"),  ------组件地址
 */

const routes = [
    {
        path: "",
        redirect: "home",
        component: Layouts,
        children: [
            {
                path: "/login",
                name: "Login",
                meta: {
                    title: "登录",
                    oneself: true,
                    hide: true,
                },
                component: () => import("../views/login"),
            },
            {
                path: "/userportrait",
                meta: {title: "用户头像", icon: "el-icon-s-home"},
                component: () => import("../views/userportrait"),
            },
            {
                path: "/home",
                meta: {title: "首页", icon: "el-icon-s-home"},
                component: () => import("../views/home"),
            },
            {
                path: "/datadetail",
                meta: {title: "数据详情", icon: "el-icon-s-data"},
                component: () => import("../views/datadetail"),
            },
            {
                path: "/systemsetting",
                meta: {title: "系统设置", icon: "el-icon-set-up"},
                component: Parent,
                children: [
                    {
                        path: "log",
                        meta: {title: "日志管理", icon: "el-icon-document"},
                        component: () => import("../views/systemsetting/logadmin"),
                    },
                    {
                        path: "accout",
                        meta: {title: "账号管理", icon: "el-icon-discover"},
                        component: () => import("../views/systemsetting/account"),
                    },
                    {
                        path: "data",
                        meta: {title: "数据管理", icon: "el-icon-tickets"},
                        component: () => import("../views/systemsetting/dataadmin"),
                    },
                    {
                        path: "monitor",
                        meta: {title: "账号监控", icon: "el-icon-data-line"},
                        component: () => import("../views/systemsetting/monitor"),
                    },
                    {
                        path: "parseaddress",
                        meta: {title: "解析地点", icon: "el-icon-data-line"},
                        component: () => import("../views/systemsetting/parseaddress"),
                    }
                ]
            },
        ],
    },
];

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法，取消路由重复的报错
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 前置路由拦截器
router.beforeEach((to, from, next) => {
    // 设置当前页签名称
    document.title = to.meta.title;
    // 没有登录并且要去的页面不是登录页面，在强制跳转到登录
    if (to.path === "/login") {
        localStorage.removeItem('userInfo')
        next()
    } else if (!localStorage.getItem('userInfo')) {
        next('/login')
    } else {
        next()
    }
});

export default router;

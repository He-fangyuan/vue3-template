/*@/router/index.ts*/
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 定义路由
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/components/Home.vue'),
        meta: {
            title: '首页',
        },
    },
    {
        path: '/login',
        name: '登录页面',
        component: () => import('@/components/Login.vue'),
        meta: {
            title: 'Login',
        },
    },
    {
        path: '/pinia',
        name: 'Pinia页面',
        component: () => import('@/components/Pinia.vue'),
        meta: {
            title: 'Pinia',
        },
    },
    {
        path: '/lang',
        name: '国际化',
        component: () => import('@/components/Lang.vue'),
        meta: {
            title: 'I18n',
        },
    },
    {
        path: '/mock',
        name: 'Mock',
        component: () => import('@/components/mockTest.vue'),
        meta: {
            title: 'mock',
        },
    },
]

//创建路由实例，把定义的路由挂载到路由实例中
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

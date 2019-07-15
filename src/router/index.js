/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/layout/index'
import BlankRouteLayout from '@/layout/blank-route-layout'

Vue.use(Router)


/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色都可以访问
 */
export const constantRoutes = [
    {
        path: '/',
        component: () => import('@/views/login/index'),
        name: 'Login',
        hidden: true
    },
    // 一般控制台是每个人员都应该看到的、所以比较固定，就放到常量路由中
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/dashboard/index'),
                name: 'DashboardIndex',
                meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/404'),
        hidden: true
    }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 * 这里的路由会在页面中配置，并且后端，前端动态添加
 */
export const asyncRoutes = [
    {
        path: '/program',
        component: Layout,
        redirect: '/program/list',
        meta: { title: 'program', icon: 'dashboard' },
        children: [
            {
                path: 'list',
                component: () => import('@/views/program/list'),
                name: 'ProgramList',
                meta: { title: 'ProgramList', icon: 'dashboard' }
            },
            {
                path: 'view',
                component: () => import('@/views/program/view'),
                name: 'ProgramView',
                meta: { title: 'ProgramView', icon: 'dashboard' }
            }
        ]
    },
    {
        path: '/technology',
        component: Layout,
        redirect: '/technology/bom-list',
        meta: { title: 'technology', icon: 'dashboard' },
        children: [
            {
                path: 'bom-list',
                component: () => import('@/views/technology/bom/list'),
                name: 'TechnologyBomList',
                meta: { title: 'TechnologyBomList', icon: 'dashboard' }
            },
            {
                path: 'bom-view',
                component: () => import('@/views/technology/bom/view'),
                name: 'TechnologyBomView',
                meta: { title: 'TechnologyBomView', icon: 'dashboard' }
            },
            {
                path: 'path',
                component: BlankRouteLayout,
                name: 'TechnologyPath',
                meta: { title: 'TechnologyPath', icon: 'dashboard' },
                children: [
                    {
                        path: 'work-step-list',
                        component: () => import('@/views/technology/work-step/list'),
                        name: 'TechnologyWorkStepList',
                        meta: { title: 'TechnologyWorkStepList', icon: 'dashboard' }
                    },
                    {
                        path: 'work-step-view',
                        component: () => import('@/views/technology/work-step/view'),
                        name: 'TechnologyWorkStepView',
                        meta: { title: 'TechnologyWorkStepView', icon: 'dashboard' }
                    },
                    {
                        path: 'process-flow',
                        component: () => import('@/views/technology/process-flow/index'),
                        name: 'TechnologyProcessFlow',
                        meta: { title: 'TechnologyProcessFlow', icon: 'dashboard' }
                    }
                ]
            },
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system/user',
        meta: { title: 'system', icon: 'dashboard' },
        children: [
            {
                path: 'user',
                component: () => import('@/views/system/user'),
                name: 'SystemUser',
                meta: { title: 'SystemUser', icon: 'dashboard' }
            },
            {
                path: 'role',
                component: () => import('@/views/system/role'),
                name: 'SystemRole',
                meta: { title: 'SystemRole', icon: 'dashboard' }
            },
            {
                path: 'dict',
                component: () => import('@/views/system/dict'),
                name: 'SystemDict',
                meta: { title: 'SystemDict', icon: 'dashboard' }
            },
            {
                path: 'router',
                component: () => import('@/views/system/router'),
                name: 'SystemRouter',
                meta: { title: 'SystemRouter', icon: 'dashboard' }
            }
        ]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router

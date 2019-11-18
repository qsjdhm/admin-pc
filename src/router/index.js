/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不总是设置show，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * name:'router-name'             名称由<keep-alive>使用(必须设置!!)
 * meta : {
    zhTitle: 'title'             菜单的中文名称(必须设置!!)
    enTitle: 'title'             菜单的英文名称
    icon: 'svg-name'             侧边栏的图标
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，此tag将tags-view中不能被点击删除
    activeMenu: '/example/list'  当此页面打开并且为详情页时，会在侧边栏显示它设置的页面
    permission: ['add', 'delete']此页面需要被权限控制的按钮或元素
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
                meta: { zhTitle: '工作台', enTitle: 'DASHBOARD', icon: 'dashboard', affix: true }
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

export const programRoute = {
    path: '/program',
    component: 'Layout',
    redirect: '/program/list',
    meta: { zhTitle: '程序管理', enTitle: 'PROGRAM', icon: 'dashboard' },
    children: [
        {
            path: 'list',
            component: '/program/list',
            name: 'ProgramList',
            meta: { zhTitle: '程序管理', enTitle: 'PROGRAM', icon: 'dashboard' },
            permission: [
                {key: 'add', name: '新增'},
                {key: 'edit', name: '编辑'},
                {key: 'delete', name: '删除'},
                {key: 'view', name: '查看详情'},
                {key: 'view1', name: '查看详情1'}
            ]
        },
        {
            path: 'view',
            component: '/program/view',
            name: 'ProgramView',
            hidden: true,
            meta: { zhTitle: '程序详情', enTitle: 'PROGRAM VIEW', icon: 'dashboard', activeMenu: '/program/list', noCache: true },
            permission: [
                {key: 'clone', name: '克隆程序'},
                {key: 'approval', name: '审批程序'}
            ]
        }
    ]
}

export const technologyRoute = {
    path: '/technology',
    component: 'Layout',
    redirect: '/technology/bom-list',
    meta: { zhTitle: '工艺管理', enTitle: 'TENCHNOLOGY', icon: 'dashboard' },
    children: [
        {
            path: 'bom-list',
            component: '/technology/bom/list',
            name: 'TechnologyBomList',
            meta: { zhTitle: 'BOM管理', enTitle: 'BOM', icon: 'dashboard' },
            permission: [
                {key: 'add', name: '新增'},
                {key: 'edit', name: '编辑'},
                {key: 'delete', name: '删除'},
                {key: 'view', name: '查看详情'}
            ]
        },
        {
            path: 'bom-view',
            component: '/technology/bom/view',
            name: 'TechnologyBomView',
            meta: { zhTitle: 'BOM详情', enTitle: 'BOM VIEW', icon: 'dashboard', noCache: true },
            permission: [
                {key: 'clone', name: '克隆BOM'}
            ]
        },
        {
            path: 'path',
            component: 'BlankRouteLayout',
            name: 'TechnologyPath',
            meta: { zhTitle: '工艺路线', enTitle: 'TENCHNOLOGY PATH', icon: 'dashboard' },
            children: [
                {
                    path: 'work-step-list',
                    component: '/technology/work-step/list',
                    name: 'TechnologyWorkStepList',
                    meta: { zhTitle: '工步', enTitle: 'WORK STEP', icon: 'dashboard' },
                    permission: [
                        {key: 'add', name: '新增'},
                        {key: 'edit', name: '编辑'},
                        {key: 'delete', name: '删除'},
                        {key: 'view', name: '查看详情'}
                    ]
                },
                {
                    path: 'work-step-view',
                    component: '/technology/work-step/view',
                    name: 'TechnologyWorkStepView',
                    meta: { zhTitle: '工步详情', enTitle: 'WORK STEP VIEW', icon: 'dashboard', noCache: true }
                },
                {
                    path: 'process-flow',
                    component: '/technology/process-flow/index',
                    name: 'TechnologyProcessFlow',
                    meta: { zhTitle: '工序', enTitle: 'PROCESS FLOW', icon: 'dashboard' }
                }
            ]
        }
    ]
}

export const systemRoute = {
    path: '/system',
    component: 'Layout',
    redirect: '/system/user',
    meta: { zhTitle: '系统管理', enTitle: 'SYSTEM', icon: 'dashboard' },
    children: [
        {
            path: 'user',
            component: '/system/user',
            name: 'SystemUser',
            meta: { zhTitle: '用户管理', enTitle: 'USER', icon: 'dashboard' }
        },
        {
            path: 'role',
            component: '/system/role',
            name: 'SystemRole',
            meta: { zhTitle: '角色管理', enTitle: 'ROLE', icon: 'dashboard' }
        },
        {
            path: 'permission',
            component: '/system/permission',
            name: 'SystemPermission',
            meta: { zhTitle: '权限管理', enTitle: 'PERMISSION', icon: 'dashboard' }
        },
        {
            path: 'router',
            component: '/system/router',
            name: 'SystemRouter',
            meta: { zhTitle: '菜单路由', enTitle: 'ROUTER', icon: 'dashboard' }
        },
        {
            path: 'dict',
            component: '/system/dict',
            name: 'SystemDict',
            meta: { zhTitle: '字典管理', enTitle: 'DICTIONARIES', icon: 'dashboard' },
            permission: [
                {key: 'add', name: '新增'},
                {key: 'batcheDelete', name: '批量删除'},
                {key: 'config', name: '配置'},
                {key: 'edit', name: '编辑'},
                {key: 'delete', name: '删除'}
            ]
        }
    ]
}

export const asyncRoutes = []

export const errorRoutes = [
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

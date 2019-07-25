
const routes = [
    {
        path: '/program',
        component: 'Layout',
        redirect: '/program/list',
        meta: { zhTitle: '程序管理', enTitle: 'PROGRAM', icon: 'dashboard' },
        children: [
            {
                path: 'list',
                component: '/program/list',
                name: 'ProgramList',
                meta: { zhTitle: '程序管理', enTitle: 'PROGRAM', icon: 'dashboard' }
            },
            {
                path: 'view',
                component: '/program/view',
                name: 'ProgramView',
                hidden: true,
                meta: { zhTitle: '程序详情', enTitle: 'PROGRAM VIEW', icon: 'dashboard', activeMenu: '/program/list', noCache: true }
            }
        ]
    },
    {
        path: '/technology',
        component: 'Layout',
        redirect: '/technology/bom-list',
        meta: { zhTitle: '工艺管理', enTitle: 'TENCHNOLOGY', icon: 'dashboard' },
        children: [
            {
                path: 'bom-list',
                component: '/technology/bom/list',
                name: 'TechnologyBomList',
                meta: { zhTitle: 'BOM管理', enTitle: 'BOM', icon: 'dashboard' }
            },
            {
                path: 'bom-view',
                component: '/technology/bom/view',
                name: 'TechnologyBomView',
                meta: { zhTitle: 'BOM详情', enTitle: 'BOM VIEW', icon: 'dashboard', noCache: true }
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
                        meta: { zhTitle: '工步', enTitle: 'WORK STEP', icon: 'dashboard' }
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
    },
    {
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
                path: 'auth',
                component: '/system/auth',
                name: 'SystemAuth',
                meta: { zhTitle: '权限管理', enTitle: 'AUTHORITY', icon: 'dashboard' }
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
                meta: { zhTitle: '字典管理', enTitle: 'DICTIONARIES', icon: 'dashboard' }
            }
        ]
    }
]

export default [
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            return {
                code: 200,
                data: 'jhsadjyvasdyvasyvduyasd'
            }
        }
    },

    // get user info
    {
        url: '/user/getUserInfo',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: {
                    name: '张三',
                    permission: JSON.stringify(routes)
                }
            }
        }
    },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]

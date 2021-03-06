
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

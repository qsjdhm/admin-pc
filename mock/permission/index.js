import Mock from 'mockjs'
import { programRoute, technologyRoute, systemRoute } from './routes.js'


export default [
    // 根据用户获取对应的权限
    {
        url: '/permission/getListByUser',
        type: 'get',
        response: config => {
            let { token } = config.query;
            let userPermission = [];
            if (token === 'root') {
                userPermission.push(programRoute, technologyRoute, systemRoute)
            } else if (token === 'admin') {
                userPermission.push(programRoute, technologyRoute, {
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
                            path: 'dict',
                            component: '/system/dict',
                            name: 'SystemDict',
                            meta: { zhTitle: '字典管理', enTitle: 'DICTIONARIES', icon: 'dashboard' }
                        }
                    ]
                })
            } else {
                userPermission.push(programRoute, technologyRoute)
            }
            return {
                code: 200,
                data: JSON.stringify(userPermission)
            }
        }
    },

    // 获取所有的路由列表
    {
        url: '/permission/getAllList',
        type: 'get',
        response: config => {
            let routes = [programRoute, technologyRoute, systemRoute]
            return {
                code: 200,
                data: routes
            }
        }
    },

    // 根据权限获取所有的路由列表
    {
        url: '/permission/getListByAuth',
        type: 'get',
        response: config => {
            let routes = [];
            let authCode = config.query.authCode;
            if (authCode === 'USER-FUNCTION-1') {
                routes = [programRoute]
            } else if (authCode === 'ADMIN-FUNCTION-1') {
                routes = [programRoute, technologyRoute]
            } else {
                routes = [programRoute, technologyRoute, systemRoute]
            }
            return {
                code: 200,
                data: routes
            }
        }
    }
]

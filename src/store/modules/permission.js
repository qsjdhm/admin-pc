import { constantRoutes, errorRoutes } from '@/router'
import Layout from '@/layout/index'
import BlankRouteLayout from '@/layout/blank-route-layout'
import BigScreenLayout from '@/layout/big-screen-layout'

export function filterAsyncRoutes(asyncRoutes) {
    // 遍历后台传来的路由字符串，转换为组件对象
    const accessedRoutes = []
    asyncRoutes.forEach(route => {
        if (route.component) {
            if (route.component === 'Layout') {
                // Layout组件特殊处理
                route.component = Layout
            } else if (route.component === 'BlankRouteLayout') {
                route.component = BlankRouteLayout
            } else if (route.component === 'BigScreenLayout') {
                route.component = BigScreenLayout
            } else {
                const component = route.component
                route.component = () => import(`@/views${component}`)
            }
        }
        if (route.children && route.children.length) {
            route.children = filterAsyncRoutes(route.children)
        }
        accessedRoutes.push(route)
    })
    return accessedRoutes
}

export default {
    namespaced: true,
    state: {
        // 用来承载框架级和业务级的路由容器，在调用mutations时初始化
        routes: []
    },
    getters: {},
    mutations: {
        SET_ROUTES: (state, addRoutes) => {
            // 把框架级路由和业务级路由进行合并
            state.routes = constantRoutes.concat(addRoutes)
        }
    },
    actions: {
        // 初始化菜单路由
        initRoutes ({dispatch, commit, state, rootState}, asyncRoutes) {
            return new Promise(resolve => {
                /**
                 * 如果有通过页面添加菜单的功能，可以在这里请求保存在后台数据库的菜单数据
                 * 然后再进行添加
                 */
                // 把框架路由、业务路由、404路由合并
                const accessedRoutes = filterAsyncRoutes(asyncRoutes).concat(errorRoutes)
                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }
};

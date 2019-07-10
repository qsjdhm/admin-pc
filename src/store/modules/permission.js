import { asyncRoutes, constantRoutes } from '@/router'


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
        initRoutes ({dispatch, commit, state, rootState}) {
            return new Promise(resolve => {
                /**
                 * 如果有通过页面添加菜单的功能，可以在这里请求保存在后台数据库的菜单数据
                 * 然后再进行添加
                 */
                // 把业务路由和框架路由合并
                commit('SET_ROUTES', asyncRoutes);
                resolve()
            })
        }
    }
};

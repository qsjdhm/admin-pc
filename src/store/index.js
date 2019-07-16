import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
// 自动加载modules目录下的文件，每个模块的引用是文件的名字
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
export default new Vuex.Store({
    state: {
        // 菜单是否是关闭状态
        sidebarClosed: false
    },
    getters: {},
    mutations: {
        SET_SIDEBARCLOSED: (state, value) => {
            state.sidebarClosed = value;
        }
    },
    actions: {
        // 修改菜单是否展开和隐藏
        setSideBarClosed ({dispatch, commit, state, rootState}, value) {
            commit('SET_SIDEBARCLOSED', value);
        }
    },
    modules
})

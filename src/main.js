import Vue from 'vue'
import App from './App.vue'
import fetch from './utils/request'
Vue.prototype.$fetch = fetch
import store from './store/index'
import router from './router/index'

import Element from 'element-ui'
// import './styles/element-variables.scss'


import './icons' // icon
import './permission' // permission control

import '@/styles/index.scss' // 统一进入css文件入口

Vue.use(Element)


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.use(Element, {
  size: 'medium' // set element-ui default size
})

Vue.config.productionTip = false


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

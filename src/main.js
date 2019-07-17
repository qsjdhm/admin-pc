import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

import Element from 'element-ui'
// import './styles/element-variables.scss'

import fetch from './utils/request'
import './icons' // icon
import './permission' // permission control

import '@/styles/index.scssss' // 统一进入css文件入口

Vue.use(Element)


Vue.config.productionTip = false
Vue.prototype.$fetch = fetch



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

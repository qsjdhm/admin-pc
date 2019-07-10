import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store/index'
import router from './router/index'
import Element from 'element-ui'
import './styles/element-variables.scss'
import fetch from './utils/request'


Vue.use(Element)


Vue.config.productionTip = false
Vue.prototype.$fetch = fetch



new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

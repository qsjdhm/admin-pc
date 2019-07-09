import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store/index'
import router from './routers/index'
import Element from 'element-ui'
import './styles/element-variables.scss'


Vue.use(Element)


Vue.config.productionTip = false


new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

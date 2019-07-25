/**
 * 初始化路由权限
 */
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Message } from 'element-ui'
import router from './router'
import store from './store'

// 免登录白名单
const whiteList = ['/']

NProgress.configure({
    showSpinner: false
})

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    // token没有用户信息，代表没有登录过
    if (!window.sessionStorage.getItem('Admin-Token')) {
        // 在免登录白名单，直接进入
        if (whiteList.indexOf(to.path) !== -1) {
            next()
            NProgress.done()
        } else {
            // 否则全部重定向到登录页
            next(`/?redirect=${to.path}`)
        }
    } else {
        // 如果store中没有路由数据，就初始化路由
        // 只要登录过就肯定初始化过路由，初始化过路由routes的长度就肯定不是0（因为合并的时候会把固定框架级路由合进去）
        if (store.state.permission.routes.length === 0) {
            // 获取用户信息：名称、菜单、按钮资源等
            const userInfo = await store.dispatch('user/getUserInfo')
            // 初始化菜单路由(主要是合并框架路由、当前用户所拥有的业务路由、404路由)
            store.dispatch('permission/initRoutes', JSON.parse(userInfo.permission)).then(() => {
                // 动态添加可访问路由表
                router.addRoutes(store.state.permission.routes)
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
            }).catch((error) => {
                // remove token and go to login page to re-login
                window.sessionStorage.setItem('Admin-Token', '')
                Message.error(error || 'Init Routes Error')
                next(`/?redirect=${to.path}`)
                NProgress.done()
            });
        } else {
            // 如果有，直接next
            next()
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

import { MessageBox, Message } from 'element-ui'
import fetch from '@/utils/request'


export default {
    namespaced: true,
    state: {
        token: false,
        name: '',
        avatar: '',
        language: 'zh'
    },
    getters: {},
    mutations: {
        SET_TOKEN (state, value) {
            state.token = value;
        },
        SET_NAME (state, value) {
            state.name = value;
        },
        SET_AVATAR (state, value) {
            state.avatar = value;
        },
        SET_LANGUAGE (state, value) {
            state.language = value;
        }
    },
    actions: {
        // 登录
        login ({dispatch, commit, state, rootState}, queryParam) {
            return new Promise((resolve, reject) => {
                console.info(queryParam)
                fetch('/user/login', 'post', queryParam).then((response) => {
                    window.sessionStorage.setItem('Admin-Token', response)
                    resolve()
                })
            });
        },
        // 登出
        logout ({dispatch, commit, state, rootState}, queryParam) {
            return new Promise((resolve, reject) => {
                window.sessionStorage.setItem('Admin-Token', '')
                resolve()
            });
        },
        // 获取用户信息
        getUserInfo ({dispatch, commit, state, rootState}) {
            return new Promise(async(resolve, reject) => {
                let token = window.sessionStorage.getItem('Admin-Token')
                let userInfo = await fetch('/user/getUserInfo', 'get', {token: token})
                resolve(userInfo)
                // let permission = await fetch('/permission/getListByUser', 'get', {token: token})
                // resolve({
                //     userInfo: userInfo,
                //     permission: permission
                // })
            });
        }
    }
};

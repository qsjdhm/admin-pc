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
            return new Promise((resolve, reject) => {
                let token = window.sessionStorage.getItem('Admin-Token')
                fetch('/user/getUserInfo', 'get', {token: token}).then((response) => {
                    resolve(response)
                })
            });
        }
        // // 获取用户权限
        // getUserAuthority ({dispatch, commit, state, rootState}, queryParam) {
        //     return new Promise((resolve, reject) => {
        //         API.getUserAuthority(queryParam).then(response => {
        //             if (response.code === 600) {
        //                 window.sessionStorage.setItem('Admin-Username', userInfo.username)
        //                 window.sessionStorage.setItem('Admin-Name', userInfo.name)
        //                 resolve()
        //             } else {
        //                 reject(response)
        //             }
        //         })
        //     });
        // }
    }
};

import { MessageBox, Message } from 'element-ui'
import Vue from 'vue'

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
                Vue.$fetch('/user/login', 'post', queryParam).then((response) => {
                    console.info(response)
                })
                // window.sessionStorage.setItem('Admin-Token', 'kjasbdljhbasjdbvjsab')
                resolve()
                // 1.登录请求 - axios
                // API.loginByUsername(queryParam).then(response => {
                //     if (response.code === 600) {
                //         // 2 .登录成功后进行设置设置 state中 => token
                //         commit('SET_TOKEN', response.data.token);
                //         // 3.设置sessionStorage Admin-Token
                //         window.sessionStorage.setItem('Admin-Token', response.data.token)
                //         /*
                //         * 4. 通过接口进行获取详细信息存储到 -axios
                //         * sessionStorage
                //         * */
                //         dispatch('getUserInfo').then((userInfo) => {
                //             window.sessionStorage.setItem('Admin-Username', userInfo.username)
                //             window.sessionStorage.setItem('Admin-Name', userInfo.name)
                //             /*
                //             * 5.通过接口进行获取路由表- axios
                //             * 将获取列表进行设置到session
                //             * */
                //             dispatch('getUserAuthority').then((authority) => {
                //                 window.sessionStorage.setItem('Admin-Authority', authority)
                //                 resolve(authority)
                //             }).catch((error) => {
                //                 reject(error)
                //             })
                //         }).catch((error) => {
                //             reject(error)
                //         })
                //     } else {
                //         reject(response)
                //     }
                // }).catch((e) => {
                //     reject(e)
                // })
            });
        }
        // ,
        // // 获取用户信息
        // getUserInfo ({dispatch, commit, state, rootState}, queryParam) {
        //     return new Promise((resolve, reject) => {
        //         API.getUserInfo(queryParam).then(response => {
        //             if (response.code === 600) {
        //                 window.sessionStorage.setItem('Admin-Username', userInfo.username)
        //                 window.sessionStorage.setItem('Admin-Name', userInfo.name)
        //                 resolve()
        //             } else {
        //                 reject(response)
        //             }
        //         })
        //     });
        // },
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

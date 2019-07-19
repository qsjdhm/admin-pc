/**
 * 基于axios的request配置（拦截器，统一处理所有http请求和响应）
 */

import axios from 'axios'
import _ from 'lodash'
import router from '../router'
import { Message } from 'element-ui';
let xss = require('xss');

const Axios = axios.create({
    timeout: 5000,
    responseType: 'json',
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        //'Content-Type': 'multipart/form-data'
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// POST传参序列化(添加请求拦截器)
Axios.interceptors.request.use(
    req => {
        // 1. XSS过滤
        if (req.params !== undefined && req.params !== 'undefined' && req.params !== null && req.params !== '') {
            for (var option in req.params) {
                req.params[option] = filterXSS(req.params[option]);
            }
        }
        if (req.data !== undefined && req.data !== 'undefined' && req.data !== null && req.data !== '') {
            req.data = JSON.parse(filterXSS(JSON.stringify(req.data)));
        }
        // 2. 设置token
        let token = window.sessionStorage.getItem('Admin-Token');
        if (token !== undefined && token !== null && token !== '') {
            req.headers.Authorization = token;
        }
        // 3. 处理数据的前后空格
        if (req.data !== undefined) {
            for (let dataKey in req.data) {
                if (typeof req.data[dataKey] === 'string') {
                    req.data[dataKey] = _(req.data[dataKey]).trim();
                }
            }
        }
        // 4. 转换下get等需要的数据
        if (req.method !== 'post' && req.method !== 'put' && req.method !== 'delete') {
            req.params = req.data;
        }
        return req
    },
    error => {
        return Promise.reject(error)
    }
)

// 返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        if (res.status !== 200) {
            return Promise.reject(res)
        }
        if (res.config.responseType === 'blob') {
            return res;
        }
        return res.data;
    },
    error => {
        switch (error.response.status) {
        case 401:
            // cookie过期跳转，清除token
            router.push({ 'path': '/' });
            break
        default:
        }
        Message.error(`${error.response.status} : ${error.response.statusText}`);
        // 返回 response 里的错误信息
        return Promise.reject(error)
    }
)

/**
 * 供页面调用的http请求，已绑定到vue原型上
 * 示例：（1）请求基础系统api
 * this.$fetch('/api/app/appVersionPage', 'post', {
 *     username: this.username,
 *     password: this.password
 * }).then((response) => {})
 *
 * 示例：（2）请求其他系统，如SCADA系统api
 * this.$fetch('/equipment/getList', 'get', {
 *     pageSize: this.pageSize,
 *     pageNum: this.pageNum
 * }, process.env.VUE_APP_SCADA_API).then((response) => {})
 */
function fetch (interfaceUrl, method, parameters, baseURL) {
    if (baseURL === undefined || baseURL === null || baseURL === '') {
        baseURL = process.env.VUE_APP_BASE_API
    }
    return Axios({
        url: `${baseURL}${interfaceUrl}`,
        method: method,
        data: parameters
    }).then((res) => {
        if (res.code === 600) {
            return res.data
        } else {
            return Promise.reject(res)
        }
    }).catch((error) => {
        Message.error(error.message)
        return Promise.reject(error)
    })
}

export default fetch;


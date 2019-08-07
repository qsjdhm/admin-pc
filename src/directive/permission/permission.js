import path from 'path'

export default {
    inserted(el, binding, vnode) {
        // 1. 获取所有的按钮等元素列表
        let domList = getAllPermissionList()
        // 2. 遍历-看看当前元素是否在dom列表中
        let processDomList = [];
        domList.map(item => {
            processDomList.push(`${item.url}/${item.key}`)
        })
        // 3. 判断是否存在
        if (processDomList.indexOf(`${vnode.context.$route.path}/${binding.value}`) === -1) {
            el.parentNode.removeChild(el)
        }
    }
}

// 处理在代码中有disabled和v-if并存的情况
// 比如：
/**
 * <el-switch
 *  :disabled="!$permission($route,'disable') || switchDisable"
 *  @change="enableClick(scope.row)"
 * </el-switch>
 */
/**
 * <el-button
 *  v-if="scope.row.status === '2' && $permission($route,'troubleshooting')"
 *  type="text"
 *  @click="handleServiceClick(scope.row)"
 * >故障处理</el-button>
 */
Vue.prototype.$permission = function ($route, value) {
    // 1. 获取所有的按钮等元素列表
    let domList = getAllPermissionList()
    // 2. 遍历-看看当前元素是否在dom列表中
    let processDomList = [];
    domList.map(item => {
        processDomList.push(`${item.url}/${item.key}`)
    })
    // 3. 判断是否存在
    if (processDomList.indexOf(`${$route.path}/${value}`) === -1) {
        return false
    } else {
        return true
    }
}

// 获取所有的按钮等元素列表
function getAllPermissionList () {
    // 1. 获取路由列表
    let allList = JSON.parse(window.sessionStorage.getItem('Admin-Permission'))
    // 2. 给每个路由添加全路径
    let processAllList = generateRouteFullPath(allList)
    // 3. 获取每个dom权限列表
    let allDomList = []
    getAllDomList(processAllList, allDomList)
    return allDomList
}

// 给每个路由和按钮等元素添加全路径
function generateRouteFullPath (routes, basePath = '/') {
    const res = []
    for (let route of routes) {
        const data = {
            url: path.resolve(basePath, route.path)
        }
        if (route.permission && route.permission.length > 0) {
            route.permission.map((item) => {
                item.url = path.resolve(basePath, route.path)
            })
        }
        Object.assign(data, route)
        if (route.children && route.children.length > 0) {
            data.children = generateRouteFullPath(route.children, data.url)
        }
        res.push(data)
    }
    return res
}

// 获取每个dom权限列表
function getAllDomList (data, list) {
    data.map((item) => {
        if (item.permission && item.permission.length > 0) {
            item.permission.map((permissionItem) => {
                list.push(permissionItem)
            })
        }
        if (item.children && item.children.length > 0) {
            getAllDomList(item.children, list)
        }
    })
}

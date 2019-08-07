/**
 * 路由工具类
 */
import path from 'path'
export default {
    // 生成每个路由的全路径
    generateRouteFullPath (routes, basePath = '/') {
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
}

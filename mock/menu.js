
const allMenu = [{path:'/program'}]


export default [
    // 获取所有业务菜单
    {
        url: '/menu/getAllMenu',
        type: 'get',
        response: config => {
            return {
                code: 200,
                data: allMenu
            }
        }
    }
]


export default [
    // user login
    {
        url: '/user/login',
        type: 'post',
        response: config => {
            let { username } = config.body
            let token = ''
            if (username === 'root') {
                token = 'root'
            } else if (username === 'admin') {
                token = 'admin'
            } else {
                token = 'jhsadjyvasdyvasyvduyasd'
            }
            return {
                code: 200,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/user/getUserInfo',
        type: 'get',
        response: config => {
            let { token } = config.query;
            return {
                code: 200,
                data: {
                    name: token,
                    position: '职位'
                }
            }
        }
    },

    // get user routes
    {
        url: '/user/getUserRoutes',
        type: 'get',
        response: config => {
            let { token } = config.query;
            let routes = []
            // if (token === 'root') {
            //     routes.push(programRoute, technologyRoute, systemRoute)
            // }
            return {
                code: 200,
                data: routes
            }
        }
    },

    // user logout
    {
        url: '/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]

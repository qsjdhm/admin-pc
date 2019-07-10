/**
 * vue-cli3的webpack配置文件
 */
'use strict'
const path = require('path')

// 获取src目录在硬盘的全路径，比如'f:\code\admin-pc\src'
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    devServer: {
        port: '9527',
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // 基础系统的ip地址
            [process.env.VUE_APP_BASE_API]: {
                target: `http://10.100.172.150:9105`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            },
            // SCADA系统的ip地址
            [process.env.VUE_APP_SCADA_API]: {
                target: `http://10.100.172.6:9102`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_SCADA_API]: ''
                }
            }
        }
        // ,
        // after: require('./mock/mock-server.js')
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: 'admin-pc',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack(config) {
        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true
                return options
            })
            .end()

        config
        // https://webpack.js.org/configuration/devtool/#development
        .when(process.env.NODE_ENV === 'development',
            config => config.devtool('cheap-source-map')
        )

        config
        .when(process.env.NODE_ENV !== 'development',
            config => {
                config
                    .plugin('ScriptExtHtmlWebpackPlugin')
                    .after('html')
                    .use('script-ext-html-webpack-plugin', [{
                        // `runtime` must same as runtimeChunk name. default is `runtime`
                        inline: /runtime\..*\.js$/
                    }])
                    .end()
                config
                    .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    })
                config.optimization.runtimeChunk('single')
            }
        )
    }
};
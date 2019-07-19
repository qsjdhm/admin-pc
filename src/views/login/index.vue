<template>
    <div class="login-page">
        <div class="login-pack">
            <div class="logo-pack">
                <img src="../../assets/login/logo.png">
                <div class="desc">设备云业务管理系统</div>
            </div>
            <div class="login-input">
                <div class="username-pack">
                    <el-input
                        v-model="username"
                        placeholder="请输入用户名"
                        @keyup.enter.native="loginClick"
                    >
                        <template slot="prepend">
                            <i class="iconfont iconyonghu" />
                        </template>
                    </el-input>
                </div>
                <div class="password-pack">
                    <el-input
                        v-model="password"
                        type="password"
                        placeholder="请输入密码"
                        @keyup.enter.native="loginClick"
                    >
                        <template slot="prepend">
                            <i class="iconfont iconmima" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="button-pack">
                <el-button type="primary" @click="loginClick">登录</el-button>
            </div>
            <div class="version-pack">version 1.0.0 前端大佬提供技术支持</div>
        </div>
    </div>
</template>

<script>
    import { Message } from 'element-ui'

    export default {
        name: 'Login',
        data () {
            return {
                username: 'root',
                password: '123456',
                redirect: null
            }
        },
        watch: {
            $route: {
                handler (route) {
                    this.redirect = route.query && route.query.redirect
                },
                immediate: true
            }
        },
        methods: {
            loginClick () {
                this.$store.dispatch('user/login', {
                    username: this.username,
                    password: this.password
                }).then((response) => {
                    this.$router.push({ path: this.redirect || 'dashboard' })
                })
                // this.$fetch('/auth/login', 'post', {
                //     username: this.username,
                //     password: this.password
                // }, process.env.VUE_APP_SCADA_API).then((response) => {
                //     console.info('login-------------------')
                //     console.info(response)
                // })
                // this.$store.dispatch('user/login', {username: this.username, password: this.password}).then((authority) => {
                //     this.$router.push({ path: this.redirect || 'dashboard' })
                // }).catch((error) => {
                //     this.$message.error(error.message);
                // })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/mixin.scss";
    .login-page {
        width: 100%;
        height: 100%;
        z-index: 1;
        display: grid;
        grid-template-columns: 1fr 1fr 1.3fr;
        grid-template-rows: 1fr 4fr 1fr;
        background-image: url(../../assets/login/bg.png);
        background-size: cover;

        .login-pack {
            position: relative;
            justify-self: start;
            grid-area: 2 / 3 / 3 / 4;
            background: #ffffff;
            padding: 100px 50px;
            border-radius: 15px;

            .logo-pack {
                text-align: center;
                display: flex;
                justify-content: space-around;

                img {
                    width: 80px;
                }

                .desc {
                    width: 257px;
                    height: 34px;
                    font-size: 26px;
                    line-height: 76px;
                    letter-spacing: 0px;
                    color: #14baed;
                }
            }

            .login-input {
                margin-top: 70px;
            }

            .username-pack,
                .password-pack {
                margin-top: 25px;
                margin-bottom: 10px;

                i {
                    color: #4977fc;
                    font-size: 26px;
                }
            }

            .button-pack {
                margin-top: 60px;
            }
        }

        .version-pack {
            position: absolute;
            color: #999999;
            text-align: center;
            bottom: 10px;
            margin: auto 70px;
            font-size: 12px;
        }
    }
</style>

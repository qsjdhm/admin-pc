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
                        size="medium"
                        placeholder="请输入用户名"
                        @keyup.enter.native="loginClick"
                    >
                        <template slot="prepend">
                            <svg-icon icon-class="user" />
                        </template>
                    </el-input>
                </div>
                <div class="password-pack">
                    <el-input
                        v-model="password"
                        size="medium"
                        type="password"
                        placeholder="请输入密码"
                        @keyup.enter.native="loginClick"
                    >
                        <template slot="prepend">
                            <svg-icon icon-class="password" />
                        </template>
                    </el-input>
                </div>
            </div>
            <div class="button-pack">
                <el-button v-if="loading" disabled :loading="true" type="primary">登录中</el-button>
                <el-button v-else type="primary" @click="loginClick">登录</el-button>
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
                loading: false,
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
                this.loading = true;
                this.$store.dispatch('user/login', {username: this.username, password: this.password}).then((token) => {
                    setTimeout (() => {
                        this.loading = false;
                        this.$router.push({ path: this.redirect || 'dashboard' })
                    }, 1500)
                }).catch(() => {
                    this.loading = false;
                })
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
                /deep/ .el-button {
                    width: 100%;
                    border-radius: 33px;
                    height: 60px;
                    font-size: 24px;
                }

                /deep/ .el-button--primary {
                    background-color: #4977fc;
                    border: 1px solid #1a72fe;
                    box-shadow: 0px 6px 16px 2px rgba(73, 119, 252, 0.45);
                }
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

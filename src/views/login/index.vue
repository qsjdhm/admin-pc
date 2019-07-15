<template>
    <div class="login">
        <h1>login</h1>
        <div class="username-pack">
            <el-input v-model="username" placeholder="用户名" />
        </div>
        <div class="password-pack">
            <el-input v-model="password" type="password" placeholder="密码" />
        </div>
        <div class="button-pack">
            <el-button type="primary" @click="loginClick">
                登录
            </el-button>
        </div>
    </div>
</template>

<script>
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
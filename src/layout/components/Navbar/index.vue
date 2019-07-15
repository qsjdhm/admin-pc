<template>
    <div class="navbar">
        <div class="left-pack">
            <img class="company-logo" src="./logo.png" />
            <span class="company-title">第四代前端框架平台</span>
        </div>
        <div class="right-pack">
            <div class="cockpit-pack">
                <img class="logo" src="./logo.png" />
                <el-tooltip class="item" effect="dark" content="点击可进入大屏" placement="bottom">
                    <span class="title">领导驾驶舱</span>
                </el-tooltip>
            </div>
            <div class="cut-off-rule"></div>
            <div class="help-pack">
                <el-tooltip class="item" effect="dark" content="查看帮助" placement="bottom">
                    <img class="logo" src="./logo.png" />
                </el-tooltip>
            </div>
            <div class="full-pack">
                <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                    <img class="logo" src="./logo.png" />
                </el-tooltip>
            </div>
            <div class="user-pack">
                <img class="logo" src="./avatar.png" />
                <span>张小五</span>
            </div>
            <div class="cut-off-rule"></div>
            <div class="logout-pack">
                <img class="logo" src="./logo.png" />
                <span>登出</span>
            </div>
        </div>
    </div>
</template>

<script>
    import screenfull from 'screenfull'

    export default {
        name: 'Navbar',
        data () {
            return {
                username: ''
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        width: 100%;
        height: 54px;
        padding: 0 20px 0 15px;
        background-color: #002140;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left-pack {
            display: -webkit-flex;
            display: flex;
            align-items: center;
            .company-logo {
                width: 24px;
                height: 24px;
                margin-right: 15px;
            }
            .company-title {
                font-size: 18px;
                color: #fff;
            }
        }

        .right-pack {
            height: 100%;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            .cockpit-pack {
                height: 100%;
                padding: 0 15px;
                /*background-color: rgba(255, 255, 255, 0.2);*/
                display: -webkit-flex;
                display: flex;
                align-items: center;
                .logo {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                }
                .title {
                    font-size: 14px;
                    color: #fff;
                }
            }
            .help-pack, .full-pack {
                height: 100%;
                margin-right: 20px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                img {
                    width: 18px;
                    height: 18px;
                }
            }
            .user-pack {
                height: 100%;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                img {
                    width: 36px;
                    height: 36px;
                    margin-right: 5px;
                }
                span {
                    font-size: 14px;
                    color: #fff;    
                }
            }
            .logout-pack {
                height: 100%;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                img {
                    width: 18px;
                    height: 18px;
                    margin-right: 5px;
                }
                span {
                    font-size: 14px;
                    color: #fff;    
                }
            }

            .cut-off-rule {
                border-right: 1px solid #8a8989;
                height: 28px;
                margin: 0 20px;
            }
        }
    }
</style>

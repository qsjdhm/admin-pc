<template>
    <div class="navbar">
        <div class="left-pack">
            <el-tooltip class="item" effect="dark" :content="!sidebarClosed ? '收缩菜单' : '展开菜单'" placement="bottom">
                <div class="fold-pack" @click="foldClick">
                    <img class="fold" src="./fold.png">
                </div>
            </el-tooltip>
            <div class="search-pack">
                <el-autocomplete
                    v-model="state"
                    popper-class="my-autocomplete"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="搜索此项目中的菜单"
                    @select="handleSelect"
                >
                    <i
                        slot="suffix"
                        class="el-icon-search el-input__icon"
                    />
                    <template slot-scope="{ item }">
                        <div class="name">{{ item.value }}</div>
                        <span class="addr">{{ item.address }}</span>
                    </template>
                </el-autocomplete>
            </div>
        </div>
        <div class="right-pack">
            <el-tooltip class="item" effect="dark" content="进入领导驾驶舱系统" placement="bottom">
                <div class="cockpit-pack">
                    <img class="logo" src="./cockpit.png">
                    <span class="title">领导驾驶舱</span>
                </div>
            </el-tooltip>
            <el-dropdown @command="dropdownCommand">
                <div class="user-pack el-dropdown-link">
                    <img class="logo" :src="require(`./avatar.png`)">
                    <span>张小五</span>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="password">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-tooltip class="item" effect="dark" :content="!sidebarClosed ? '全屏' : '结束全屏'" placement="bottom">
                <div class="full-pack" @click="fullClick">
                    <img src="./full.png">
                </div>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="登出" placement="bottom">
                <div class="logout-pack">
                    <img class="logout" src="./logout.png">
                </div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import screenfull from 'screenfull'

    export default {
        name: 'Navbar',
        data () {
            return {
                username: '',
                restaurants: [],
                state: '',
                timeout:  null
            }
        },
        computed: {
            ...mapState({
                sidebarClosed: state => state.sidebarClosed
            })
        },
        mounted() {
            this.restaurants = this.loadAll();
        },
        methods: {
            foldClick () {
                this.$store.dispatch('setSideBarClosed', !this.sidebarClosed)
            },
            fullClick () {
                if (!screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不能使用此功能，请升级为最新版本',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
                this.foldClick()
            },
            dropdownCommand (command) {},
            loadAll() {
                return [
                    { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                    { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                    { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    { "value": "泷千家(天山西路店)", "address": "天山西路438号" }
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000);
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    $itemHover: #f1f1f1;
    $borderColor: 1px solid #e2e2e2;
    .navbar {
        width: 100%;
        height: 50px;
        padding: 0;
        background-color: #fff;
        border-bottom: 1px solid #d8dce5;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        align-items: center;


        .left-pack {
            display: -webkit-flex;
            display: flex;
            .fold-pack {
                font-size: 20px;
                height: 50px;
                border-right: $borderColor;
                cursor: pointer;
                -webkit-transition: all .3s,padding 0s;
                transition: all .3s,padding 0s;
                padding: 0 16px;
                color: #333;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
                margin-right: 15px;
                &:hover {
                    cursor: pointer;
                    background: $itemHover;
                }
                img {
                    width: 18px;
                    height: 18px;
                }
            }
            .search-pack {
                position: relative;
                /deep/ .el-input__inner {
                    height: 49px!important;
                    line-height: 49px!important;
                    border: 0px!important;
                }
                /deep/ .el-input__icon {
                    line-height: 49px!important;
                    font-size: 16px!important;
                }
            }
        }

        .right-pack {
            height: 100%;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            .cockpit-pack {
                height: 100%;
                padding: 0 20px;
                border-left: $borderColor;
                border-right: $borderColor;
                /*background-color: rgba(255, 255, 255, 0.2);*/
                display: -webkit-flex;
                display: flex;
                align-items: center;
                -webkit-transition: background .3s,padding 0s;
                transition: background .3s,padding 0s;
                &:hover {
                    cursor: pointer;
                    background: $itemHover;
                }
                img {
                    width: 24px;
                    height: 24px;
                    margin-right: 10px;
                }
                .title {
                    font-size: 14px;
                }
            }
            .user-pack {
                height: 49px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                padding: 0 20px;
                border-right: $borderColor;
                -webkit-transition: background .3s,padding 0s;
                transition: background .3s,padding 0s;
                &:hover {
                    cursor: pointer;
                    background: $itemHover;
                }
                img {
                    width: 28px;
                    height: 28px;
                    margin-right: 10px;
                }
                span {
                    font-size: 14px;
                }
            }
            .full-pack {
                height: 49px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                padding: 0 20px;
                border-right: $borderColor;
                -webkit-transition: background .3s,padding 0s;
                transition: background .3s,padding 0s;
                &:hover {
                    cursor: pointer;
                    background: $itemHover;
                }
                img {
                    width: 16px;
                    height: 16px;
                }
            }
            .logout-pack {
                height: 49px;
                display: -webkit-flex;
                display: flex;
                align-items: center;
                padding: 0 20px;
                -webkit-transition: background .3s,padding 0s;
                transition: background .3s,padding 0s;
                &:hover {
                    cursor: pointer;
                    background: $itemHover;
                }
                img {
                    width: 16px;
                    height: 16px;
                }
            }

        }
    }

    .my-autocomplete {
        li {
            line-height: normal;
            padding: 7px;

            .name {
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .addr {
                font-size: 12px;
                color: #b4b4b4;
            }

            .highlighted .addr {
                color: #ddd;
            }
        }
    }
</style>

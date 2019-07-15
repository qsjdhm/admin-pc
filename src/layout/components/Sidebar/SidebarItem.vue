<template>
    <div v-if="!item.hidden" class="menu-wrapper">
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
            <router-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <span slot="title">{{ onlyOneChild.meta.title }}</span>
                </el-menu-item>
            </router-link>
        </template>
        <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <span v-if="item.meta" slot="title">{{ item.meta.title }}</span>
            </template>
            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            />
        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    export default {
        name: 'SidebarItem',
        props: {
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                required: true
            }
        },
        data () {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            // TODO: refactor with render function
            this.onlyOneChild = null
            return {}
        },
        methods: {
            hasOneShowingChild (children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(will be used if only has one showing child)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // When there is only one child router, the child router is displayed by default
                if (showingChildren.length === 1) {
                    return true
                }

                // Show parent if there are no child router to display
                if (showingChildren.length === 0) {
                    this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
                    return true
                }

                return false
            },
            resolvePath (routePath) {
                if (this.isExternal(routePath)) {
                    return routePath
                }
                if (this.isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(this.basePath, routePath)
            },
            isExternal (path) {
                return /^(https?:|mailto:|tel:)/.test(path)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "@/styles/mixin.scss";
    /* 因为把item独立为一个组件，所以需要在原来的样式上多加一层选择器‘>.sidebar-item’ */
    .el-menu--collapse>.sidebar-item>.el-menu-item span, .el-menu--collapse>.sidebar-item>.el-submenu>.el-submenu__title span {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
    }
    .el-menu--collapse>.sidebar-item>.el-menu-item .el-submenu__icon-arrow, .el-menu--collapse>.sidebar-item>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
        display: none;
    }
    .sidebar-item {
        /* 一级菜单 */
        .el-menu-item {
            height: 50px;
            line-height: 50px;
            svg {
                width: 25px;
                margin-right: 10px !important;
                font-size: 20px;
                top: 2px;
                position: relative;
            }
            svg:before {
                color: #bcbcbc !important;
            }
            &:hover {
                background-color: #001529 !important;
                color: #fff !important;
            }
            [class^=el-icon-] {
                margin-right: 10px;
            }
        }
        /* 有子级的菜单 */
        .el-submenu {
            >div {
                height: 50px !important;
                line-height: 50px !important;
            }
            .el-menu-item [class^=el-icon-] {
                margin-right: 10px;
            }
            .el-submenu__title {
                height: 40px;
                line-height: 40px;
                &:hover {
                    background-color: #001529 !important;
                    color: #fff !important;
                }
                svg {
                    margin-right: 10px!important;
                    font-size: 20px;
                    top: 2px;
                    position: relative;
                }
                svg:first-child {
                    width: 25px;
                }
                svg:before {
                    color: #94949b !important;
                }
                .el-submenu__icon-arrow {
                    font-size: 14px;
                    font-weight: bold;
                }
            }
            /* 子级的子菜单 */
            .el-menu {
                background-color: #000c17 !important;
                li {
                    background-color: #000c17 !important;
                    font-size: 12px !important;
                    div {
                        /*padding-left: 60px!important;*/
                    }
                }
            }
            .el-menu-item {
                height: 40px;
                line-height: 40px;
                svg {
                    font-size: 20px;
                    top: 2px;
                    position: relative;
                }
                /*padding-left: 60px !important;*/
                svg:before {
                    color: #bcbcbc;
                }
                span {
                    margin-left: 20px;
                }
            }
            /* 子级的子级菜单 */
            .el-submenu {
                >div {
                    height: 40px !important;
                    line-height: 40px !important;
                }
                svg:before {
                    color: #bcbcbc;
                }
                span {
                    font-size: 12px !important;
                    margin-left: 20px;
                }
                .el-submenu__title {
                    height: 40px;
                    line-height: 40px;
                    background-color: #000c17 !important;
                    &:hover {
                        background-color: #000c17 !important;
                        color: #fff !important;
                    }
                }
            }
        }
        .is-active {
            color: #fff !important;
            background-image: linear-gradient(-225deg, #108ee9 0%, #32a8fe 100%);
            &:hover {
                color: #fff !important;
                background-image: linear-gradient(-225deg, #108ee9 0%, #32a8fe 100%);
            }
            svg:before {
                color: #fff !important;
            }
        }
    }
</style>

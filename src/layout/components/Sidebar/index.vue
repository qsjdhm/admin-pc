<template>
    <div class="sidebar">
        <logo :collapse="sidebarClosed" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                mode="vertical"
                class="el-menu-vertical-demo"
                background-color="#001529"
                text-color="#bcbcbc"
                active-text-color="#fff"
                :collapse="sidebarClosed"
                :default-active="activeMenu"
                :unique-opened="true"
                :collapse-transition="true"
            >
                <sidebar-item
                    v-for="route in routes"
                    :key="route.path"
                    :item="route"
                    :base-path="route.path"
                />
            </el-menu>
        </el-scrollbar>
        <div class="power-by">前端大佬们提供技术支持</div>
    </div>
</template>

<script>
    import { mapState, mapGetters } from 'vuex'
    import Logo from './Logo'
    import SidebarItem from './SidebarItem'

    export default {
        name: 'Sidebar',
        components: {
            SidebarItem,
            Logo
        },
        data () {
            return {
                // 菜单栏区域高度
                menuHieght: 0
            }
        },
        computed: {
            ...mapState({
                sidebarClosed: state => state.sidebarClosed,
                routes: state => state.permission.routes
            }),
            activeMenu () {
                const route = this.$route
                const {meta, path} = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            }
        },
        mounted () {},
        methods: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    // sidebar
    $menuText:#bfcbd9;
    $menuActiveText:#409EFF;
    $subMenuActiveText:#f4f4f5; // https://github.com/ElemeFE/element/issues/12951
    $menuBg:#000000;
    $menuHover:#263445;
    $subMenuBg:#1f2d3d;
    $subMenuHover:#001528;
    $sideBarWidth: 240px;
    $borderRadius: 5px;
    #app {
        .main-container {
            min-height: 100%;
            transition: margin-left .28s;
            margin-left: $sideBarWidth;
            position: relative;
        }

        .sidebar-container {
            transition: width 0.28s;
            width: $sideBarWidth !important;
            background-color: $menuBg;
            height: 100%;
            position: fixed;
            font-size: 0px;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;

            // reset element-ui css
            .horizontal-collapse-transition {
                transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
            }

            .scrollbar-wrapper {
                overflow-x: hidden !important;
                background-color: #001529;
                text-align: left;
            }

            .el-scrollbar__bar.is-vertical {
                right: 0px;
            }

            .el-scrollbar {
                // 减掉 powerBy 50
                height: calc(100% - 50px);
            }

            &.has-logo {
                .el-scrollbar {
                    height: calc(100% - 50px);
                }
            }

            .is-horizontal {
                display: none;
            }

            a {
                display: inline-block;
                width: 100%;
                overflow: hidden;
            }

            .svg-icon {
                margin-right: 16px;
            }

            .el-menu {
                border: none;
                height: 100%;
                width: 100% !important;
            }

            // menu hover
            .submenu-title-noDropdown,
            .el-submenu__title {
                &:hover {
                    background-color: $menuHover !important;
                }
            }

            .is-active {
                color: #fff !important;
                background-image: linear-gradient(-225deg, #108ee9 0%, #32a8fe 100%);
            }

            .is-active>.el-submenu__title {
                color: $subMenuActiveText !important;
            }

            & .el-menu-item {
                background-color: #000000 !important;
            }

            & .nest-menu .el-submenu>.el-submenu__title,
            & .el-submenu .el-menu-item {
                min-width: $sideBarWidth !important;
                // background-color: $subMenuBg !important;

                &:hover {
                    background-color: $subMenuHover !important;
                }
            }
        }

        .hideSidebar {
            .sidebar-container {
                width: 54px !important;
            }

            .main-container {
                margin-left: 54px;
            }

            .submenu-title-noDropdown {
                padding: 0 !important;
                position: relative;

                .el-tooltip {
                    padding: 0 !important;

                    .svg-icon {
                        margin-left: 20px;
                    }
                }
            }

            .el-submenu {
                overflow: hidden;

                &>.el-submenu__title {
                    padding: 0 !important;

                    .svg-icon {
                        margin-left: 20px;
                    }

                    .el-submenu__icon-arrow {
                        display: none;
                    }
                }
            }

            .el-menu--collapse {
                .el-submenu {
                    &>.el-submenu__title {
                        &>span {
                            height: 0;
                            width: 0;
                            overflow: hidden;
                            visibility: hidden;
                            display: inline-block;
                        }
                    }
                }
            }
        }

        .el-menu--collapse .el-menu .el-submenu {
            min-width: $sideBarWidth !important;
        }

        // mobile responsive
        .mobile {
            .main-container {
                margin-left: 0px;
            }

            .sidebar-container {
                transition: transform .28s;
                width: $sideBarWidth !important;
            }

            &.hideSidebar {
                .sidebar-container {
                    pointer-events: none;
                    transition-duration: 0.3s;
                    transform: translate3d(-$sideBarWidth, 0, 0);
                }
            }
        }

        .withoutAnimation {

            .main-container,
            .sidebar-container {
                transition: none;
            }
        }
    }

    // when menu collapsed
    .el-menu--vertical {
        &>.el-menu {
            .svg-icon {
                margin-right: 16px;
            }
        }

        .nest-menu .el-submenu>.el-submenu__title,
        .el-menu-item {
            &:hover {
                // you can use $subMenuHover
                background-color: $menuHover !important;
            }
        }

        // the scroll bar appears when the subMenu is too long
        >.el-menu--popup {
            max-height: 100vh;
            overflow-y: auto;

            &::-webkit-scrollbar-track-piece {
                background: #d3dce6;
            }

            &::-webkit-scrollbar {
                width: 6px;
            }

            &::-webkit-scrollbar-thumb {
                background: #99a9bf;
                border-radius: 20px;
            }
        }
    }

    .power-by {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        background-color: #001529;
        color: #bcbcbc;
        text-align: center;
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>

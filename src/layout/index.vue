<template>
    <div :class="classObj" class="layout">
        <sidebar class="sidebar-container" />
        <!--<board />-->
        <div class="main-container">
            <div>
                <navbar />
                <tags-view />
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Sidebar from './components/Sidebar'
    //import Board from './components/Board'
    import TagsView from './components/TagsView'
    import AppMain from './components/AppMain'
    import { mapState } from 'vuex'

    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            //Board,
            TagsView,
            AppMain
        },
        computed: {
            ...mapState({
                sidebarClosed: state => state.sidebarClosed
            }),
            classObj() {
                return {
                    hideSidebar: this.sidebarClosed,
                    openSidebar: !this.sidebarClosed
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .layout {
        position: relative;
        height: 100%;
        width: 100%;
        background: #f5f5f5;
    }
</style>

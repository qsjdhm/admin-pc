<template>
    <div class="layout">
        <navbar />
        <sidebar class="sidebar-container" />
        <board />
        <router-view />
    </div>
</template>

<script>
    import Navbar from './components/Navbar'
    import Sidebar from './components/Sidebar'
    import Board from './components/Board'
    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            Board
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .layout {
        position: relative;
        height: 100%;
        width: 100%;

    }
</style>

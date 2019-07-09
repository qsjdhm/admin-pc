<template>
    <div class="layout">
        <router-view />
    </div>
</template>

<script>
    export default {
        name: 'Layout'
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .layout {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>

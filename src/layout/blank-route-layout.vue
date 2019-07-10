<!-- 用作菜单多级展示的空白路由容器 -->
<template>
    <div class="blank-route-layout">
        <router-view />
    </div>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'BlankRouteLayout'
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .blank-route-layout {
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>

<template>
    <div class="login">
        <h1>work-step list</h1>
        <el-button v-permission="['add']" type="primary">新增</el-button>
    </div>
</template>


<script>
    import permission from '@/directive/permission/index.js' // 权限判断指令
    export default {
        name: 'TechnologyWorkStepList',
        directives: { permission }
    }
</script>

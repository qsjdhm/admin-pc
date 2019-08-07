<template>
    <div class="login">
        <h1>ProgramView</h1>
        <el-button v-permission="['clone']" type="primary">克隆程序</el-button>
    </div>
</template>

<script>
    import permission from '@/directive/permission/index.js' // 权限判断指令
    export default {
        name: 'ProgramView',
        directives: { permission }
    }
</script>

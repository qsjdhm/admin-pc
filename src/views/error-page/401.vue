<template>
    <div class="wscn-http401-container">
        401
    </div>
</template>

<script>

export default {
    name: 'Page401',
    computed: {
        message() {
            return 'The webmaster said that you can not enter this page...'
        }
    }
}
</script>

<style lang="scss" scoped>
.wscn-http401-container{
    transform: translate(-50%,-50%);
    position: absolute;
    top: 40%;
    left: 50%;
}
</style>

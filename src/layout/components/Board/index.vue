<template>
    <div class="board">
        <div class="btn-pack">
            <i class="el-icon-arrow-left" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "Board",
        data () {
            return {
                content: '<'
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .board {
        width: auto;
        position: absolute;
        font-size: 0px;
        top: 54px;
        bottom: 0;
        left: 240px;
        z-index: 1001;
        display: -webkit-flex;
        display: flex;
        align-items: center;
        border-left: 0px solid #3da8f5;
        transition: all 0.2s;
        &:hover {
            transition: all 0.2s;
            border-left: 3px solid #3da8f5;
            cursor: pointer;
            .btn-pack {
                transition: all 0.2s;
                color: #fff;
                background-color: #3da8f5;
                border: 1px solid #3da8f5;
                width: 14px;
            }
        }
        .btn-pack {
            transition: all 0.2s;
            height: 45px;
            width: 15px;
            background-color: #fff;
            border-radius: 0 4px 4px 0;
            border: 1px solid #e5e5e5;
            color: #8c8c8c;
            font-size: 18px;
            display: -webkit-flex;
            display: flex;
            align-items: center;
            i {
                margin-left: -2px;
            }
        }
    }
</style>

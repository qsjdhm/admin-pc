<template>
    <div class="router">
        <div class="structure-pack">
            <el-tree
                node-key="path"
                highlight-current
                default-expand-all
                empty-text="系统暂无业务菜单"
                :data="treeRoutes"
                :props="defaultProps"
                :default-expanded-keys="keys"
                @node-click="nodeClick"
            />
        </div>
        <div class="editor-pack">
            <div class="tip-pack">
                提示：一些配置提示
            </div>
            <json-editor ref="jsonEditor" v-model="value" />
        </div>
    </div>
</template>

<script>
    import JsonEditor from '@/components/JsonEditor'
    export default {
        name: 'SystemRouter',
        components: {
            JsonEditor
        },
        data () {
            return {
                value: '',
                keys: ['root'],
                treeRoutes: [],
                defaultProps: {
                    children: 'children',
                    label: (data, node) => {
                        if (!data.meta) {
                            return '暂未命名'
                        }
                        return data.meta.zhTitle
                    }
                }
            }
        },
        async mounted () {
            const userInfo = await this.$store.dispatch('user/getUserInfo')
            this.value = JSON.parse(userInfo.permission)
            this.treeRoutes = [{
                path: 'root',
                meta: { zhTitle: '系统业务路由' },
                children: this.value
            }]
        },
        methods: {
            // 节点点击事件
            nodeClick (nodeData) {
                this.value = _.cloneDeep(nodeData)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .router {
        position: relative;
        height: 100%;
        width: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        .structure-pack {
            width: 340px;
            height: 100%;
            overflow-y: auto;
            background: #fff;
            border: 1px solid #efefef;
            border-radius: 3px;
            /deep/ .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
                background-color: #279ff7;
                color: #fff;
            }
        }
        .editor-pack{
            background: #fff;
            border: 1px solid #efefef;
            border-radius: 3px;
            position: absolute;
            height: 100%;
            left: 360px;
            right: 0;
            text-align: left;
            overflow: auto;
            .tip-pack {
                font-size: 14px;
                height: 30px;
                line-height: 30px;
                padding-left: 10px;
            }
            .json-editor {
                line-height: 2;
                font-size: 16px;
            }
        }
    }
</style>

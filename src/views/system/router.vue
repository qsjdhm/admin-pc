<template>
    <div class="router">
        <div class="structure-pack">
            <el-tree
                ref="routeTree"
                node-key="path"
                highlight-current
                default-expand-all
                empty-text="系统暂无业务菜单"
                :data="treeRoutes"
                :props="defaultProps"
                :expand-on-click-node="false"
                @node-click="nodeClick"
            />
        </div>
        <div class="content-pack">
            <div class="tip-pack">
                <div class="tip">
                    提示：点击【路由规则】按钮，可查看路由编写规则
                </div>
                <div class="button-pack">
                    <el-button type="primary" size="mini" @click="saveClick">保存</el-button>
                    <el-button size="mini">路由规则</el-button>
                </div>
            </div>
            <div class="editor-pack">
                <json-editor ref="jsonEditor" v-model="value" />
            </div>
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
            this.value = _.cloneDeep(await this.$store.dispatch('permission/getAllList'))
            this.treeRoutes = [{
                path: 'root',
                meta: { zhTitle: '系统业务路由' },
                children: this.value
            }]
            setTimeout(() => {
                this.$refs.routeTree.setCurrentKey('root');
            }, 0)
        },
        methods: {
            // 节点点击事件
            nodeClick (nodeData) {
                if (nodeData.path === 'root') {
                    this.value = _.cloneDeep(nodeData.children)
                } else {
                    this.value = _.cloneDeep(nodeData)
                }
            },
            saveClick () {
                console.info(this.value)
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
        .content-pack{
            background: #fff;
            border: 1px solid #efefef;
            border-radius: 3px;
            position: absolute;
            height: 100%;
            left: 360px;
            right: 0;
            text-align: left;
            .tip-pack {
                font-size: 14px;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                display: -webkit-flex; /* Safari */
                display: flex;
                justify-content: space-between;
                padding: 0 15px;
            }
            .editor-pack {
                position: absolute;
                top: 40px;
                bottom: 0;
                width: 100%;
                overflow-y: auto;
                .json-editor {
                    line-height: 2;
                    font-size: 16px;
                }
            }
        }
    }
</style>

<template>
    <div class="permission">
        <div class="operation-pack">
            <div class="btn-pack">
                <el-button type="primary">新增</el-button>
                <el-button type="danger" plain>批量删除</el-button>
            </div>
            <div class="search-pack">
                <el-input v-model="keyword" placeholder="请输入搜索关键字" />
                <el-button icon="el-icon-search">搜索</el-button>
                <el-button>重置</el-button>
            </div>
        </div>
        <div ref="contentPack" class="content-pack">
            <div class="table-pack">
                <el-table
                    border
                    stripe
                    :data="tableData"
                    :height="tableHeight"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column
                        type="selection"
                        width="35"
                    />
                    <el-table-column
                        prop="code"
                        label="权限编码"
                    />
                    <el-table-column
                        prop="name"
                        label="权限名称"
                    />
                    <el-table-column
                        prop="time"
                        label="维护时间"
                    />
                    <el-table-column label="权限类型">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.type === 'FUNCTION'">功能权限</el-tag>
                            <el-tag v-else type="success">数据权限</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template slot-scope="scope">
                            <el-button type="text" @click="configClick(scope.row)">配置</el-button>
                            <el-button type="text">编辑</el-button>
                            <el-button type="text">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="paging-pack">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000"
                />
            </div>
        </div>

        <!-- 功能列表弹框 -->
        <el-dialog
            v-el-drag-dialog
            title="配置功能权限"
            :close-on-press-escape="false"
            :close-on-click-modal="false"
            :show-close="false"
            :visible.sync="functionDialog"
            width="850px"
            class="function-dialog"
        >
            <div class="function-config-pack">
                <div class="tip-pack">
                    <span class="flag" />
                    <span class="name">普通用户功能权限【USER-FUNCTION-1】</span>
                </div>
                <div ref="functionTablePack" class="function-table-pack">
                    <el-table
                        :data="allRoutes"
                        :height="460"
                        style="width: 810px;"
                        row-key="path"
                        border
                        default-expand-all
                        :tree-props="{children: 'children'}"
                    >
                        <el-table-column
                            prop="date"
                            label="菜单"
                            width="200"
                        >
                            <template slot-scope="scope">
                                {{ scope.row.meta.zhTitle }}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="功能"
                        >
                            <template slot-scope="scope">
                                <div v-for="(data, index) in scope.row.permission" :key="index" class="function-item">
                                    <span>{{ data.name }}</span>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="functionDialog = false">取 消</el-button>
                <el-button type="primary" @click="functionDialog = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import elDragDialog from '@/directive/el-drag-dialog' // base on element-ui
    export default {
        name: 'SystemPermission',
        directives: { elDragDialog },
        data () {
            return {
                keyword: '',
                tableHeight: 0,
                tableData: [{
                    code: 'USER-FUNCTION-1',
                    time: '2016-05-02',
                    name: '普通用户功能权限',
                    type: 'FUNCTION'
                }, {
                    code: 'USER-DATA-1',
                    time: '2016-05-02',
                    name: '普通用户数据权限',
                    type: 'DATA'
                }, {
                    code: 'ADMIN-FUNCTION-1',
                    time: '2016-05-02',
                    name: '普通管理员功能权限',
                    type: 'FUNCTION'
                }, {
                    code: 'ADMIN-DATA-1',
                    time: '2016-05-02',
                    name: '普通管理员数据权限',
                    type: 'DATA'
                }, {
                    code: 'ROOT-FUNCTION-1',
                    time: '2016-05-02',
                    name: '超级管理员功能权限',
                    type: 'FUNCTION'
                }, {
                    code: 'ROOT-DATA-1',
                    time: '2016-05-02',
                    name: '超级管理员数据权限',
                    type: 'DATA'
                }],
                functionDialog: false,
                allRoutes: []
            }
        },
        async mounted () {
            this.allRoutes = _.cloneDeep(await this.$store.dispatch('permission/getAllList'))
            setTimeout(() => {
                this.tableHeight = this.$refs.contentPack.offsetHeight - 50
            }, 0)
        },
        methods: {
            configClick (row) {
                console.info(row)
                this.functionDialog = true;
            },
            handleSelectionChange () {},
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .permission {
        position: relative;
        height: 100%;
        width: 100%;
        .operation-pack {
            height: 45px;
            line-height: 40px;
            display: -webkit-flex;
            display: flex;
            justify-content: space-between;
            background: #fff;
            border: 1px solid #efefef;
            border-radius: 5px;
            padding: 0 10px;
            margin-bottom: 10px;
            .btn-pack {}
            .search-pack {
                /deep/ .el-input {
                    width: 170px;
                    margin-right: 10px;
                }
            }
        }
        .content-pack {
            position: absolute;
            top: 55px;
            width: 100%;
            bottom: 0;
            background: #fff;
            .table-pack {}
            .paging-pack {
                height: 40px;
                text-align: center;
                position: absolute;
                bottom: 0;
                width: 100%;
            }
        }

        .function-config-pack {
            height: 500px;

            .tip-pack {
                width: 100%;
                text-align: left;
                height: 25px;
                line-height: 25px;
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                /*background: #efefef;
                border-radius: 3px;*/
                .flag {
                    display: inline-block;
                    width: 4px;
                    height: 15px;
                    background: #4B91FC;
                    margin-right: 10px;
                    border-radius: 3px;
                }
                .name {
                    font-size: 16px;
                    color: #333;
                    font-weight: bold;
                }
            }
            .content-pack {
                height: 100%;
            }
        }
        .function-dialog {
            .function-item {
                width: 25%;
                float: left;
                min-height: 30px;
                line-height: 30px;
            }
        }
    }
</style>

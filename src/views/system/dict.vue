<template>
    <div class="dict">
        <div class="operation-pack">
            <div class="btn-pack">
                <el-button v-permission="'add'" type="primary">新增</el-button>
                <el-button v-permission="'batcheDelete'" type="danger" plain>批量删除</el-button>
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
                >
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
                            <el-button v-permission="'config'" type="text" @click="configClick(scope.row)">配置</el-button>
                            <el-button v-permission="'edit'" type="text">编辑</el-button>
                            <el-button v-permission="'delete'" type="text">删除</el-button>
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
    </div>
</template>

<script>
    import permission from '@/directive/permission/index.js' // 权限判断指令
    export default {
        name: 'SystemDict',
        directives: { permission },
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
                }]
            }
        },
        async mounted () {
            setTimeout(() => {
                this.tableHeight = this.$refs.contentPack.offsetHeight - 50
            }, 0)
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .dict {
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
    }
</style>

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
                        :data="actionableRoutes"
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
                            <template slot="header">
                                <div class="custom-th-pack">
                                    <span>菜单</span>
                                    <div class="all-checkbox-pack">
                                        <span>全选</span>
                                        <input v-model="allChecked" type="checkbox" @change="allChange()">
                                    </div>
                                </div>
                            </template>

                            <template slot-scope="scope">
                                {{ scope.row.meta.zhTitle }}
                                <div class="menu-checkbox-pack">
                                    <!--<el-checkbox v-model="scope.row.checked" @change="menuChange(scope.row)" />-->
                                    <input v-model="scope.row.checked" type="checkbox" @change="menuChange(scope.row)">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="功能"
                        >
                            <template slot-scope="scope">
                                <div v-for="(data, index) in scope.row.permission" :key="index" class="function-item">
                                    <!--<el-checkbox v-model="data.checked" @change="permissionChange(data)">{{ data.name }}</el-checkbox>-->
                                    <input v-model="data.checked" type="checkbox" @change="permissionChange(scope.row, data)">
                                    <label>{{ data.name }}</label>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelClick">取 消</el-button>
                <el-button type="primary" @click="confirmClick">确 定</el-button>
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
                allChecked: false,
                backupAllRoutes: [],  // 空白路由备份
                authRoutes: [],  // 此权限拥有的权限
                actionableRoutes: [],  // 过滤好的路由列表
                submitList: []  // 用于提交的数据
            }
        },
        async mounted () {
            this.backupAllRoutes = _.cloneDeep(await this.$store.dispatch('permission/getAllList'))
            setTimeout(() => {
                this.tableHeight = this.$refs.contentPack.offsetHeight - 50
            }, 0)
        },
        methods: {
            /*********************************响应事件********************************/
            handleSelectionChange () {},
            configClick (row) {
                this.functionDialog = true;
                this.$fetch('/permission/getListByAuth', 'get', {
                    authCode: row.code
                }).then((response) => {
                    this.authRoutes = _.cloneDeep(response)
                    // 初始化此权限弹框数据
                    this.initAuthPermission();
                })
            },
            // 全选checkbox 点击事件
            allChange () {
                // 根据全选状态设置所有菜单、按钮、dom是否被选中
                this.actionableRoutes.map((item) => {
                    this.setPermissionState(item, this.allChecked)
                })
                // TODO:
                // 数据改变，但是dom没改变，猜测是复杂数据vue可以监听到，但是复杂数据对应的复杂dom vue应该没处理好
                // 所以这里，重新倒腾一下数据进行赋值
                let list = _.cloneDeep(this.actionableRoutes)
                this.actionableRoutes = _.cloneDeep(list)
            },
            // 菜单checkbox 点击事件
            menuChange (row) {
                // 1. 处理按钮等权限
                if (row.permission && row.permission.length > 0) {
                    row.permission.map((item) => {
                        item.checked = row.checked
                    })
                }
                // 2. 如果当前菜单选中/取消选中，它的children都应该选中/取消选中
                this.setPermissionState(row, row.checked)
                // TODO:
                // 数据改变，但是dom没改变，猜测是复杂数据vue可以监听到，但是复杂数据对应的复杂dom vue应该没处理好
                // 所以这里，重新倒腾一下数据进行赋值
                let list = _.cloneDeep(this.actionableRoutes)
                this.actionableRoutes = _.cloneDeep(list)
            },
            // 功能checkbox 点击事件
            permissionChange (menu, permission) {
                // 如果这个页面有一个功能按钮选中了，那么这个肯定要被选中
                if (permission.checked === true) {
                    menu.checked = true
                }
            },
            confirmClick () {
                this.functionDialog = false;
                this.submitList = _.cloneDeep(this.actionableRoutes);
                this.getCheckedPermission(this.submitList)
                console.info(this.submitList)
                // 重置路由选中状态
                this.actionableRoutes = _.cloneDeep(this.backupAllRoutes)
            },
            cancelClick () {
                this.functionDialog = false;
                // 重置路由选中状态
                this.actionableRoutes = _.cloneDeep(this.backupAllRoutes)
            },
            /*********************************功能方法********************************/
            // 初始化此权限弹框数据
            initAuthPermission () {
                // 空白路由列表和权限所属路由列表对比
                this.actionableRoutes = _.cloneDeep(this.backupAllRoutes)
                this.authRoutes.map((item) => {
                    this.setActionableRoutesChecked(item, this.actionableRoutes)
                })
            },
            // 根据路由，匹配对应的路由列表
            // 每当当前路由的path对应，就把route的对应路由表再次递归遍历，设置children或子子children的路由选中
            // route 当前路由
            // matchedRoutes 当前路由对应的路由表（被用来设置是否需要选中）
            setActionableRoutesChecked (route, matchedRoutes) {
                matchedRoutes.map((matchedItem) => {
                    if (route.path === matchedItem.path) {
                        // 1. 设置菜单选中
                        matchedItem.checked = true
                        // 2. 设置按钮等元素选中
                        if (route.permission && route.permission.length > 0) {
                            route.permission.map((routePermissionItem) => {
                                matchedItem.permission.map((matchedPermissionItem) => {
                                    if (routePermissionItem.key === matchedPermissionItem.key) {
                                        matchedPermissionItem.checked = true
                                    }
                                })
                            })
                        }
                        // 3. 如发现有children，递归遍历重复以上操作
                        if (route.children && route.children.length > 0) {
                            route.children.map((routeItem) => {
                                this.setActionableRoutesChecked(routeItem, matchedItem.children)
                            })
                        }
                    }
                })
            },
            // 设置每个权限的状态
            setPermissionState (data, state) {
                // 1. 设置菜单状态
                data.checked = state
                // 2. 设置按钮等元素选中
                if (data.permission && data.permission.length > 0) {
                    data.permission.map((item) => {
                        item.checked = state
                    })
                }
                // 3. 如发现有children，递归遍历重复以上操作
                if (data.children && data.children.length > 0) {
                    data.children.map((item) => {
                        this.setPermissionState(item, state)
                    })
                }
            },
            // 获取保存的所有选中权限
            getCheckedPermission (list) {
                // TODO:
                // 因为map在index--后无法减少数组总长度，所以只能用for循环，i--之后再减掉len的长度
                for (let i = 0, len = list.length; i < len; i++) {
                    // 1. 删除菜单未选中的项
                    if (list[i].checked !== true) {
                        list.splice(i, 1);
                        i--
                        len--
                    } else {
                        // 2. 删除未选中的按钮等元素
                        if (list[i].permission && list[i].permission.length > 0) {
                            for (let pi = 0, pLen = list[i].permission.length; pi < pLen; pi++) {
                                if (list[i].permission[pi].checked !== true) {
                                    list[i].permission.splice(pi, 1);
                                    pi--
                                    pLen--
                                }
                            }
                        }
                        // 3. 如果有children，递归重复以上操作
                        if (list[i].children && list[i].children.length > 0) {
                            this.getCheckedPermission(list[i].children)
                        }
                    }
                }
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
                display: flex;
                align-items: center;
                input {
                    margin-right: 10px;
                }
            }
            .custom-th-pack {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 0;
                min-height: 30px;
                line-height: 30px;
                .all-checkbox-pack {
                    float: right;
                    min-height: 30px;
                    line-height: 30px;
                    display: flex;
                    align-items: center;
                    padding: 0;
                    span {
                        margin-right: 10px;
                    }
                    input {
                        margin-right: 5px;
                    }
                }
            }
            .menu-checkbox-pack {
                float: right;
                min-height: 30px;
                line-height: 30px;
                display: flex;
                align-items: center;
                input {
                    margin-right: 5px;
                }
            }
        }
    }
</style>

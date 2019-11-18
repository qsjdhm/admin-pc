<template>
    <div class="page">
        <!-- 组件列表区域 -->
        <div class="left-pack">
            <div class="widget-cate">页面字段</div>
            <div class="components-list">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div class="component-pack">
                            <i class="el-icon-setting" />
                            <span>页面背景</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="widget-cate">基础字段</div>
            <div class="components-list">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div class="component-pack">
                            <i class="el-icon-document-remove" />
                            <span>普通文字</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="component-pack">
                            <i class="el-icon-picture-outline" />
                            <span>图片</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="widget-cate">高级字段</div>
            <div class="components-list">
                <el-row :gutter="10">
                    <el-col :span="12">
                        <div class="component-pack">
                            <i class="el-icon-pie-chart" />
                            <span>设备利用率</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="component-pack">
                            <i class="el-icon-stopwatch" />
                            <span>设备指标</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 组件列表区域 -->
        <div class="middle-pack">
            <div class="tools-pack">
                <div class="title-pack">
                    中通客车监控大屏A1
                </div>
                <div class="button-pack">
                    <el-button icon="el-icon-full-screen" type="text" @click="canvasSizeVisible = true">调整画布尺寸</el-button>
                    <el-button icon="el-icon-delete" class="red" type="text">清空</el-button>
                    <el-button icon="el-icon-view" type="text">预览</el-button>
                    <el-button icon="el-icon-mouse" type="text">保存</el-button>
                    <el-button icon="el-icon-warning-outline" type="text">帮助</el-button>
                </div>
            </div>
            <div :style="canvasStyle" class="modeling-pack">
                <vue-draggable-resizable :grid="[10,10]" :w="200" :h="200" :parent="true">
                    <el-image style="width: 100%; height: 100%" :src="url" />
                    <div slot="tr" class="component-delete" @click="componentDeleteClick">
                        <i class="el-icon-delete" />
                    </div>
                </vue-draggable-resizable>
                <vue-draggable-resizable :grid="[10,10]" :w="200" :h="200" :parent="true">
                    <el-image style="width: 100%; height: 100%" :src="url" />
                </vue-draggable-resizable>
            </div>
        </div>
        <!-- 组件属性区域 -->
        <div class="right-pack">
            <el-tabs v-model="activeProperty" :stretch="false" style="width: 100%;">
                <el-tab-pane label="样式属性" name="style">样式属性</el-tab-pane>
                <el-tab-pane label="数据属性" name="data">数据属性</el-tab-pane>
            </el-tabs>
        </div>

        <!-- 设置页面宽高、标题弹框 -->
        <el-dialog
            title="画布显示大小设置"
            width="500px"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :visible.sync="canvasSizeVisible"
        >
            <div>
                <el-form ref="canvasSizeDom" :model="canvasSizeData" :rules="canvasSizeRule" label-position="left" label-width="130px">
                    <el-form-item label="画布名称" prop="name" :required="true">
                        <el-input v-model="canvasSizeData.name" />
                    </el-form-item>
                    <el-form-item label="画布宽度（PX）" prop="width" :required="true">
                        <el-input-number v-model="canvasSizeData.width" :min="1024" :max="4096" controls-position="right" @change="canvasSizeWidthChange" />
                    </el-form-item>
                    <el-form-item label="画布高度（PX）" prop="height" :required="true">
                        <el-input-number v-model="canvasSizeData.height" :min="768" :max="2160" controls-position="right" @change="canvasSizeHeightChange" />
                    </el-form-item>
                </el-form>
                <div class="preview-pack">
                    <div class="label">画布大致比例</div>
                    <div style="width: 100%; text-align: center;">
                        <div :style="{height: canvasPreviewHeight }" class="preview">
                            {{ canvasSizeData.width }} X {{ canvasSizeData.height }}
                        </div>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="canvasSizeCancel">取 消</el-button>
                <el-button type="primary" @click="canvasSizeConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import VueDraggableResizable from 'vue-draggable-resizable'
    import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
    export default {
        name: 'DashboardIndex',
        components: {VueDraggableResizable},
        data: function () {
            return {
                // 设置画布大小逻辑代码
                canvasSizeVisible: false,
                canvasSizeData: {
                    name: '中通客车监控大屏A1',
                    width: 1024,
                    height: 768
                },
                canvasSizeRule: {
                    name: [{required: true, message: '请输入画布名称', trigger: 'change'}],
                    width: [{required: true, message: '请输入画布宽度', trigger: 'change'}],
                    height: [{required: true, message: '请输入画布高度', trigger: 'change'}]
                },
                canvasPreviewHeight: '300px',
                canvasStyle: {
                    position: 'relative',
                    width: '1024px',
                    height: '768px',
                    minWidth: '1024px',
                    minHeight: '768px',
                    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
                    backgroundColor: '#fff',
                    backgroundSize: '10px 10px, 10px 10px'
                },
                // 组件
                componentList: [],
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                // 组件样式和数据属性逻辑代码
                activeProperty: 'style'
            }
        },
        mounted () {
            this.$store.dispatch('setSideBarClosed', true)
            // this.canvasSizeVisible = true;
        },
        methods: {
            canvasSizeWidthChange () {
                this.canvasPreviewHeight = 460 / (this.canvasSizeData.width / this.canvasSizeData.height) + 'px'
            },
            canvasSizeHeightChange () {
                this.canvasPreviewHeight = 460 / (this.canvasSizeData.width / this.canvasSizeData.height) + 'px'
            },
            canvasSizeConfirm () {
                this.$refs['canvasSizeDom'].validate((valid) => {
                    if (valid) {
                        this.canvasStyle.width = this.canvasSizeData.width + 'px'
                        this.canvasStyle.height = this.canvasSizeData.height + 'px'
                        this.canvasStyle.minWidth = this.canvasSizeData.width + 'px'
                        this.canvasStyle.minHeight = this.canvasSizeData.height + 'px'
                        this.canvasSizeVisible = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            canvasSizeCancel () {
                this.$refs['canvasSizeDom'].resetFields();
                this.canvasSizeVisible = false
            },
            componentDeleteClick () {
                console.info(11111111)
            },
            onResize (x, y, width, height) {
                this.x = x
                this.y = y
                this.width = width
                this.height = height
            },
            onDrag (x, y) {
                this.x = x
                this.y = y
            }
        }
    }
</script>

<style lang="scss" scoped>
    .red {
        color: red!important;
    }

    /* tab页样式覆盖 */
    /deep/ .el-tabs__nav {
        width: 100%;
    }
    /deep/ .el-tabs__active-bar {
        width: 50%;
    }
    /deep/ .el-tabs__item {
        width: 50%;
        padding: 0;
    }
    /* 计数器样式覆盖 */
    /deep/ .el-input-number--mini {
        width: 100%;
    }
    /deep/ .el-input-number.is-controls-right .el-input__inner {
        text-align: left;
    }
    /* 弹出框样式覆盖 */
    /deep/ .el-dialog__body {
        .preview-pack {
            width: 100%;
            .label {
                text-align: left;
                padding: 10px;
                font-weight: bold;
            }
            .preview {
                width: 460px;
                background-color: #f4f6fc;
                display: -webkit-flex;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 36px;
                border: 1px dashed #65aaff;
            }
        }
    }

    .page {
        position: relative;
        height: 100%;
        width: 100%;
        display: -webkit-flex;
        display: flex;
        justify-content: space-between;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        .left-pack {
            width: 250px;
            height: 100%;
            background: #fff;
            text-align: left;
            padding-top: 5px;
            overflow-y: auto;
            overflow-x: hidden;

            .widget-cate {
                padding: 8px 12px;
                font-size: 13px;
                font-weight: bold;
            }

            .components-list {
                padding: 0 10px;
                margin: 0;

                .component-pack {
                    font-size: 12px;
                    line-height: 26px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 5px 0;
                    color: #333;
                    border: 1px solid #f4f6fc;
                    background-color: #f4f6fc;
                    cursor: pointer;

                    &:hover {
                        border: 1px dashed #1278f6;
                        i {
                            color: #1278f6;
                        }
                        span {
                            color: #1278f6;
                        }
                    }

                    i {
                        margin-right: 6px;
                        margin-left: 8px;
                        font-size: 14px;
                        display: inline-block;
                        vertical-align: middle;
                    }

                    span {
                        display: inline-block;
                        vertical-align: middle;
                    }
                }
            }
        }

        .middle-pack {
            position: absolute;
            left: 260px;
            right: 310px;
            top: 0;
            bottom: 0;
            overflow: auto;
            .tools-pack {
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                border-bottom: 1px solid #e4e7ed;
                text-align: right;
                background-color: #fff;
                padding: 0 20px 0 10px;
                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .title-pack {
                    font-size: 16px;
                    font-weight: bold;
                }
            }
            .modeling-pack {
                .component-delete {
                    background: #409eff;
                    width: 28px;
                    height: 28px;
                    line-height: 28px;
                    color: #fff;
                    position: relative;
                    left: -1px;
                    top: -1px;
                }
            }
        }

        .right-pack {
            width: 300px;
            height: 100%;
            background: #fff;
        }
    }
</style>

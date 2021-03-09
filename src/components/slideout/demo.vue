<template>
    <itv-container class="page-slideout">
        <itv-header>Slideout</itv-header>
        <itv-main>
            <slideout>
                <slideitem class="message-outer">
                    <div class="message-item">
                        <div class="message-content">
                            <div class="left-status exam">
                                考试
                            </div>
                            <div class="right-content">
                                您好，请参加发布最新考试【培训小组定期发布测试】
                            </div>
                        </div>
                        <div class="message-link-bar">
                            <div class="link-left">系统公告</div>
                            <div class="link-right">2020/02/28
                                <i class="icon-arrow"></i>
                            </div>
                        </div>
                    </div>
                    <template slot="meun">
                        <slidebutton class="btn btn-del">删除</slidebutton>
                    </template>
                </slideitem>

                <slideitem class="message-outer">
                    <div class="message-item">
                        <div class="message-content">
                            <div class="left-status exam">
                                考试
                            </div>
                            <div class="right-content">
                                您好，请参加发布最新考试【培训小组定期发布测试】
                            </div>
                        </div>
                        <div class="message-link-bar">
                            <div class="link-left">系统公告</div>
                            <div class="link-right">2020/02/28
                                <i class="icon-arrow"></i>
                            </div>
                        </div>
                    </div>
                    <template slot="meun">
                        <slidebutton class="btn btn-del">删除</slidebutton>
                        <slidebutton class="btn btn-edit">编辑</slidebutton>
                    </template>
                </slideitem>

            </slideout>
        </itv-main>

    </itv-container>

</template>

<script>
import slideitem from "../slideitem/slideitem.vue";
import slideout from "./slideout.vue";
import slidebutton from "../slidebutton/slidebutton";
export default {
    components: {
        slideout,
        slideitem,
        slidebutton
    },
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        plugin(value) {
            this.$itv.popup.confirm({
                html: "weg",
                hideOnClick: true,
                text: ""
            });
        },
        page() {
            console.log("page------");
        }
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.page-slideout {
    background-color: #eee;
}

.btn-del {
    background-color: #f56c6c;
    color: #fff;
}
.btn-edit {
    background-color: #409eff;
    color: #fff;
}
.message-outer {
    margin-top: 16ipx;
    /deep/ .slide-bar-group-btn {
        right: 16ipx;
        .slide-btn {
            font-size: 16ipx;
            &:last-child {
                border-top-right-radius: 8ipx;
                border-bottom-right-radius: 8ipx;
            }
            &:first-child {
                border-top-left-radius: 8ipx;
                border-bottom-left-radius: 8ipx;
                margin-left: 16ipx;
            }
            &:only-child {
                border-radius: 8ipx;
            }
        }
    }
}
.message-item {
    margin-left: 16ipx;
    margin-right: 16ipx;
    background-color: #fff;
    padding: 12ipx;
    border-radius: 8ipx;

    .message-content {
        display: flex;
        .left-status {
            font-size: 12ipx;
            height: 18ipx;
            line-height: 18ipx;
            flex: 0 0 auto;
            padding-right: 6ipx;
            padding-left: 6ipx;
            border-radius: 4ipx;
            &.exam {
                background: rgba(255, 97, 103, 0.2);
                color: #ff6167;
            }
            &.course {
            }
        }
        .right-content {
            flex: 1;
            margin-left: 8ipx;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #333;
            letter-spacing: 0;
            font-weight: 600;
            line-height: 20ipx;
        }
    }
    .message-link-bar {
        display: flex;
        justify-content: space-between;
        line-height: 18ipx;
        padding-top: 8ipx;
        margin-top: 11ipx;
        font-size: 12ipx;
        color: #999;
        position: relative;
        .link-right {
            .icon-arrow {
                font-size: 12ipx;
            }
        }
        &::before {
            content: " ";
            position: absolute;
            left: 0ipx;
            right: 0ipx;
            top: 0ipx;
            border-top: #eee solid 1px;
            transform: scaleY(0.5);
        }
    }
}
</style>

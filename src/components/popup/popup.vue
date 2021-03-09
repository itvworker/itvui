<template lang="html">
    <itv-dialog v-model="value" :hideOnClick="hideOnClick">
        <div class="itv-popup">
            <div class="itv-popup-content">
                <slot>
                    <h2 v-html="title" v-show="title"></h2>
                    <div class="itv-popup-msg" v-html="content" v-show="content">
                        {{content}}
                    </div>
                </slot>
            </div>
            <div class="itv-group-btn">
                <div @click="cancel" v-show="!hideBtnCancel" class="itv-popup-cancel">
                    {{cancelText}}
                </div>
                <div @click="confirm" class="itv-popup-confirm">
                    {{confirmText}}
                </div>
            </div>
        </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from "../dialog/dialog.vue";
export default {
    name: "itv-popup",
    props: {
        //是否显示
        value: {
            type: Boolean,
            default: false
        },
        //点击遮罩层是否关闭
        hideOnClick: {
            type: Boolean,
            default: false
        },
        //是否取显示取消按钮
        hideBtnCancel: {
            type: Boolean,
            default: false
        },
        confirmText: {
            type: String,
            default: "确认"
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        }
    },
    components: {
        ItvDialog
    },
    watch: {
        value(a, b) {
            if (!a) {
                this.$emit("hide");
            }
        }
    },
    methods: {
        cancel() {
            this.$emit("cancel");
            this.$emit("hide");
        },
        confirm() {
           
            this.$emit("confirm");
            this.$emit("hide");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/animate.less";

.itv-popup {
    background-color: #fff;
    border-radius: 4ipx;
    width: 260ipx;
}
.itv-group-btn {
    display: flex;
    height: 44ipx;
    position: relative;
    > div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 16ipx;
        &:active {
            background-color: rgba(0, 0, 0, 0.1);
        }
    }
    &:after {
        border-bottom: #ddd solid 1px;
        position: absolute;
        left: 0px;
        right: 0px;
        content: "";
        transform: scaleY(0.5);
    }
    .itv-popup-confirm {
        color: @itv-primary-color;
    }
    .itv-popup-cancel {
        color: #aaa;
        position: relative;
        &::after {
            position: absolute;
            content: " ";
            border-right: #ddd solid 1px;
            transform: scaleX(0.5);
            right: 0px;
            top: 0px;
            bottom: 0px;
        }
    }
}
.itv-popup-content {
    padding: 10ipx;
    h2 {
        font-weight: normal;
        text-align: center;
        padding: 10ipx 0px;
        margin: 0px;
        font-weight: 400;
    }
    .itv-popup-msg {
        text-align: center;
        font-size: 14ipx;
        padding-bottom: 10ipx;
        color: #666;
    }
}
</style>

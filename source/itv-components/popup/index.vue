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
import ItvDialog from "../dialoger/index.vue";
export default {
    name: "popup",
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
@import '../../assets/css/itv-theme.less';
@import "../../assets/css/animate.less";
@import 'itv-popup.less';
</style>

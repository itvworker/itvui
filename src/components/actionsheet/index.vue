<template lang="html">
    <div class="itv-ui">
         <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close" v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition name="itv-slide-top" >
            <div class="itv-acitonsheet" v-show="value" :style="{'z-index':zIndex+1}">
                <div class="itv-item" v-for="(item, index) in items" :key="index" @click="confirm(item)">
                    {{item.text}}
                </div>
                <div class="itv-item itv-cancel" @click.stop="close" v-show="!hideBtnCancel">
                    {{cancelText}}
                </div>
                <div class="ios-screen" v-if="iosScreen"></div>
            </div>
        </transition>
    </div>
   
</template>

<script>
export default {
    name: "itv-actionsheet",
    props: {
        items: {
            type: Array,
            default: () => []
        },
        zIndex: {
            type: Number,
            default: 99
        },
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
        cancelText: {
            type: String,
            default: "取消"
        },
        content: {
            type: String,
            default: ""
        }
    },

    computed: {
        iosScreen() {
            let isNewIphone =
                navigator.userAgent.indexOf("iPhone") > -1 &&
                window.screen.height >= 812 &&
                window.devicePixelRatio >= 2;
            return isNewIphone;
        }
    },
    watch: {
        value(a, b) {
            if (!a) {
                this.$emit("close");
            }
        }
    },
    methods: {
        cancel() {
            this.$emit("hide");
            this.$emit("cancel");
        },
        confirm(item) {
            this.$emit("hide");
            this.$emit("confirm", item);
        },
        close() {
            this.$emit("hide");
        }
    }
};
</script>

<style lang="less" scoped>
// @import "~@/assets/css/plugin.less";
.itv-bg {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.itv-acitonsheet {
    position: fixed;
    bottom: 0;
    background-color: #eee;
    z-index: 100;
    width: 100%;
    .itv-item {
        height: 44ipx;
        display: flex;
        line-height: 0;
        justify-content: center;
        align-items: center;
        position: relative;
        background-color: #fff;
        font-size: 16ipx;
        color: #333;
        &::after {
            content: " ";
            display: block;
            position: absolute;
            bottom: 0;
            border-bottom: #ddd solid 1px;
            left: 0;
            right: 0;
            transform: scaleY(0.5);
        }
    }
    .itv-cancel {
        margin-top: 5ipx;
        color: #999;
        // &::after {
        //     display: none;
        // }
    }

    .ios-screen {
        // background-color: #fff;
        height: 34px;
    }
}
</style>

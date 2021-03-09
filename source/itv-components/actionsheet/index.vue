<template lang="html">
    <div class="itv-ui" @touchstart="clickStatus">
         <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close"  v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition name="itv-slide-top" >
            <div class="itv-acitonsheet" v-show="value" :style="{'z-index':zIndex+1}">
                <div class="itv-item" :class="{'itv-active': current === index}" v-for="(item, index) in items" :key="index" @click="confirm(item)">
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
    name: "actionsheet",
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
        },
        current: {
            type: Number,
            defualt:null
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
    data() {
        return {
            status: false
        }
    },
    watch: {
        value(a, b) {
            if (!a) {
                this.$emit("close");
            }else{
                this.status = false;
            }
        }
    },
    methods: {
        cancel() {
            if(!this.status) return
            this.$emit("hide");
            this.$emit("cancel");
        },
        confirm(item) {
            if(!this.status) return
            this.$emit("hide");
            this.$emit("confirm", item);
        },
        close() {
            if(!this.status) return
            this.$emit("hide");
        },
        closeBg(e) {
            if(e.target.className.indexOf('itv')>-1) {
                this.$emit('hide');
            }
        },
        clickStatus() {
           this.status = true;
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-actionsheet.less';
</style>


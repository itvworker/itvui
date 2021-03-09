<template lang="html">
    <div class="itv-ui">
         <transition name="itv-fade">
            <div class="itv-bg" @click.stop="close" v-show="value"  :style="{'z-index':zIndex}"></div>
        </transition>
        <transition name="itv-slide-top" >
            <div class="itv-toggle"  v-show="value" :style="{'z-index':zIndex+1}">
                <div class="itv-msg-content" :style=" {'max-height': maxHeight}">
                    <div class="itv-msg-title"> 班次信息
                         <span class="icon iconfont icon-failure1" @click="closeMsg"></span>
                    </div>
                    <div class="itv-msg-scroller"  ref="msg">

                    </div>
                </div>
            </div>
        </transition>
    </div>
   
</template>

<script>
export default {
    name: "itv-toggle",
    props: {
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
        }
       
    },
    computed: {
        maxHeight() {
            return window.innerHeight+'px';
        },
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
@itv-sec: 300ms;
.itv-slide-top-enter-active {
    animation: itv-slide-top @itv-sec;
}
.itv-slide-top-leave-active {
    animation: itv-slide-top @itv-sec reverse;
}
@keyframes itv-slide-top {
    0% {
        transform: translateY(100%);
    }
    100% {
        transform: translateY(0%);
    }
}

.itv-fade-enter-active,
.itv-fade-leave-active {
    opacity: 1;
    transition: opacity linear 0.2s;
}
.itv-fade-enter,
.itv-fade-leave-to {
    opacity: 0;
}
.itv-dialog-enter-active {
    animation: itv-dialog-in 0.5s;
}
.itv-dialog-leave-active {
    animation: itv-dialog-out @itv-sec;
}
@keyframes itv-dialog-in {
    0% {
        transform-origin: center;
        transform: translate(-50%, -50%) scale(1.185);
        opacity: 0;
    }
    100% {
        transform-origin: center;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
}
@keyframes itv-dialog-out {
    0% {
        transform-origin: center;
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }
    100% {
        transform-origin: center;
        transform: translate(-50%, -50%) scale(0.85);
        opacity: 0;
    }
}
.itv-bg {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
.itv-toggle {
    position: fixed;
    bottom: 0;
    background-color: #eee;
    z-index: 100;
    width: 100%;
    max-height: 100%;
}
.itv-msg-content{
     position: relative;
     display: flex;
     flex-direction: column;
}

.itv-msg-title{
        height: 100pt;
        display: flex;
        line-height: 0;
        align-items: center;
        justify-content: center;
        font-size:32pt;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(0,0,0,1);
        line-height:48pt;
        position: relative;
        border-bottom: #EDF0F2 solid 1px;
        flex: 0 0 auto;
        background-color: #fff;
        .icon {
            position: absolute;
            font-size: 40pt;
            right: 28pt;
            width: 40pt;
            height: 40pt;
            top: 50%;
            transform: translateY(-50%);
            color: #ddd;
        }
    }
    .itv-msg-scroller{
        box-sizing: border-box;
        flex: 1;
        -webkit-overflow-scrolling: touch;
        overflow-y: auto;
       
    }
</style>

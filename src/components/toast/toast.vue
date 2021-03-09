<template lang="html">
    <div class="itv-ui">

        <div class="itv-bg" v-show="showBg" >

        </div>
        <transition :name="currentTransition">
            <div class="itv-toast" :class="toastClass" v-show="show">
                <!-- <i></i> -->
                <img class="icon" v-show="type!=='text'" :src="icon">

                <p v-if="text">{{text}}</p>
            </div>
        </transition>

    </div>
</template>

<script>
import icons from "./icon.js";
export default {
    props: {
        transition: String,
        itvclass: "itv-center",
        position: "middle",
        type: "text",
        text: "默认内容",
        iconColor: {
            type: String,
            default: "rgba(255,255,255,1)"
        },
        showBg: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            show: false
        };
    },
    computed: {
        icon() {
            if (this.type !== "text" && icons[this.type]) {
                return icons[this.type].replace(/iconColor/gi, this.iconColor);
            }
            return "";
        },
        currentTransition() {
            if (this.transition) {
                return this.transition;
            }
            if (this.position === "top") {
                return "itv-slide-from-top";
            }
            if (this.position === "bottom") {
                return "itv-slide-from-bottom";
            }
            return "itv-fade";
        },
        toastClass() {
            return {
                "itvui-toast_forbidden": this.type === "warn",
                "itvui-toast_cancel": this.type === "cancel",
                "itvui-toast_success": this.type === "success",
                "itvui-toast_text": this.type === "text",
                "itv-toast-top": this.position === "top",
                "itv-toast-bottom": this.position === "bottom",
                "itv-toast-middle": this.position === "middle"
            };
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.$emit("input", true);
                this.$emit("show");
                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.show = false;
                    this.showBg = false;
                    this.$emit("input", false);
                    this.$emit("hide");
                }, this.time);
            }
        },
        value(val) {
            console.log(val);
            this.show = val;
        }
    }
};
</script>

<style lang="less" scoped>
.itv-bg {
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    z-index: 99;
}
.icon {
    width: 48ipx;
    height: 48ipx;
    margin-bottom: 10ipx;
}
p {
    padding: 0px;
    margin: 0px;
}
.itv-toast {
    transform: translateX(-50%);
    left: 50%;
    margin-left: 0 !important;
    position: fixed;
    border-radius: 8ipx;
    background-color: rgba(0, 0, 0, 0.6);
    padding: 0ipx 15ipx;
    color: #fff;
    min-width: 80ipx;
    max-width: 100%;
    text-align: center;
    font-size: 14ipx;
    line-height: 22ipx;
    z-index: 100;
    padding: 15ipx;
}
.itv-toast.itv-toast-top {
    top: 60ipx;
}
.itv-toast.itv-toast-bottom {
    top: auto;
    bottom: 60ipx;
    transform: translateX(-50%);
}
.itv-toast.itv-toast-middle {
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
}
.itv-slide-from-top-enter,
.itv-slide-from-top-leave-active {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%) !important;
}
.itv-slide-from-bottom-enter,
.itv-slide-from-bottom-leave-active {
    opacity: 0;
    transform: translateX(-50%) translateY(100%) !important;
}
.itv-slide-from-top-enter-active,
.itv-slide-from-top-leave-active,
.itv-slide-from-bottom-enter-active,
.itv-slide-from-bottom-leave-active {
    transition: all 400ms cubic-bezier(0.36, 0.66, 0.04, 1);
}
</style>

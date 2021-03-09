<template lang="html">
    <div class="progress" @click="send">
        <svg viewBox="0 0 100 100"  v-if="value!==false">
            <path
            d="M 50,50 m 0,-45
        a 45,45 0 1 1 0,90
        a 45,45 0 1 1 0,-90"
            stroke="rgba(145, 156, 163, 1)"
            stroke-width="10" fill-opacity="0"
            ></path>

            <path d="M 50,50 m 0,-45
            a 45,45 0 1 1 0,90
            a 45,45 0 1 1 0,-90"
            stroke-linecap="round"
            stroke="rgba(255, 255, 255, 1)"
            stroke-width="10" fill-opacity="0"
            style="stroke-dasharray: 298.451px, 298.451px;  transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"
            :style="{'stroke-dashoffset': percent+'px'}"
            ></path>
        </svg>
        <span class="item" v-if="value===false">{{tips}}</span>
        <span class="item" v-else>{{value}}%</span>
    </div>
</template>
<!-- https://www.jianshu.com/p/c819ae16d29b -->
<script>
export default {
    name: "vue-progress",
    props: {
        value: {
            type: Number || Boolean,
            default: 0
        },
        tips: {
            type: String,
            default: "上传失败"
        }
    },
    computed: {
        percent() {
            return 298.451 - (298.451 / 100) * this.value;
            // 298.451
        }
    },
    methods: {
        send() {
            if (this.value === false) {
                this.$emit("input", 0);
                this.$nextTick(() => {
                    this.$emit("restart");
                });
            }
        }
    }
};
</script>

<style lang="less" scoped>
.progress {
    width: 56rpx;
    height: 56rpx;
    position: relative;
    color: #fff;
    .item {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 14rpx;
    }
}
</style>

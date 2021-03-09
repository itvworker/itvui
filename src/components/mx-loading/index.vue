<template>
    <div class="itv-plugins">
        <div
            class="dagger-loading-content"
            v-show="value"
        >
            <svg
                id="dagger-loading"
                viewBox="0 0 44 44"
                version="1.1"
            >
                <g
                    :class="iconType"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    id="dagger-loading-pane"
                >
                    <g
                        id="loading-circle"
                        stroke-width="3"
                    >
                        <circle
                            id="circle-back-face"
                            stroke="#5B5B5C"
                            cx="22"
                            cy="22"
                            r="20"
                            stroke-linecap="round"
                        ></circle>
                        <circle
                            id="circle-front-face"
                            stroke="#188BF9"
                            cx="22"
                            cy="22"
                            r="20"
                            stroke-linecap="round"
                        ></circle>
                    </g>
                    <g
                        id="result-success"
                        transform="translate(2, 3)"
                        stroke="#188BF9"
                        stroke-width="3"
                    >
                        <path
                            d="M7.43725586,19.375 L15.6247559,27.625 L31.9372559,11.4375"
                            stroke-linecap="round"
                        ></path>
                    </g>
                    <g
                        id="result-failure"
                        transform="translate(2, 3)"
                        stroke="#FC4B4C"
                        stroke-width="3"
                    >
                        <path
                            stroke-linecap="round"
                            d="M10.125,10.09375 L29.9375,29.78125"
                        ></path>
                        <path
                            stroke-linecap="round"
                            d="M10.125,10.09375 L29.9375,29.78125"
                            transform="translate(20.031250, 19.937500) scale(-1, 1) translate(-20.031250, -19.937500) "
                        ></path>
                    </g>
                </g>
            </svg>
            <div class="status-group">
                {{text}}
            </div>
        </div>
        <div
            class="mx-loading-disable"
            v-show="disable"
        ></div>
    </div>

</template>
<script>
export default {
    props: {
        iconType: {
            type: String,
            default: ""
        },
        text: {
            type: String,
            default: ""
        },
        disable: {
            type: Boolean,
            default: true
        },
        value: {
            type: Boolean,
            default: false
        }
    }
};
</script>
<style lang="less" scoped>
@import "mx-loading.less";
</style>
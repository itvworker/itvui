<template lang="html">
    <div class="loading-more">
        <span class="spinner-holder active">
          <slot name="infinite-spinner">
            <spinner :style="{fill: loadingLayerColor, stroke: loadingLayerColor}"></spinner>
          </slot>
        </span>
          <!-- <p>
              {{text}}
          </p> -->
    </div>
</template>

<script>
import Spinner from './Spinner.vue'
export default {
    components: {
        Spinner
    },
    props: {
        loadingLayerColor: {
            type: String,
            default: '#AAA'
        },
        text: {
            type: String,
            default: '努力加载中……'
        }
    }
}
</script>

<style lang="less">
.loading-more{
    height: 100px;
    width: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    svg{
        width: 100px;
        height: 100px;
    }
    p{
        padding-left: .266667rem;
        font-size: .373333rem;
        color: #999;
        display: block;
    }
}
</style>

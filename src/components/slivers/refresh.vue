<template>
    <div class="refresh-content">
        <div class="icon-refresh-bg" :style="{'height':height, transform:`translateX(-50%) scale(${scale})`}">
            <img :src="icon" />
        </div>
        <div class="icon-refresh-main" :class="{'animate-loading': value}" :style="{'height':height, transform:`translateX(-50%) scale(${scale})`}">
            <img :src="main" />
        </div>
        <div class="text" v-if="value">
            {{loadingText}}
        </div>
        <div class="text" v-else-if="Math.abs(top) > triggerDir">
            {{letgoText}}
        </div>

        <div class="text" v-else>
            {{pullDownText}}
        </div>
        
    </div>
</template>
<script>
import {svgXml} from '../../libs/tool'
import icon from './assets/icon';
export default {
    props: {
        value: {
            type: Boolean,
            default: false
        },
        pullDownText: {
            type: String,
            default:'下拉刷新'
        },
        loadingText: {
            type: String,
            default:'更新中'
        },
        letgoText: {
            type: String,
            default:'松开刷新'
        },
        bgIconColor:{
            type: String,
            default: 'rgba(230,230,230,1)'
        },
        iconColor: {
            type: String,
            default: 'rgba(225,37,34,1)'
        },
        top: {
            type: Number,
            default: 0,
        },
        triggerDir:{
            type: Number,
            default: 60
        }
       
    },
    data() {
        return {
            currentDate: '2020/10/10',
            minMonth:'2020/10',
            maxMonth: '2021/12'
        }
        
    },
    computed: {
        height() {
             if(this.value) {
                return '100%'
            }
            let top = this.top>this.triggerDir?this.triggerDir: this.top;
            return parseInt(top/this.triggerDir*100)+'%'

        },
        scale() {
              if(this.value) {
                return 1
            }
            let top = this.top>this.triggerDir?this.triggerDir: this.top;
            return -top/this.triggerDir

        },
        icon() {
            let icons = svgXml(icon)
            icons  = icons.replace(/iconColor/ig, this.bgIconColor)
            return icons; 
        },
        main() {
            let icons = svgXml(icon)
            icons  = icons.replace(/iconColor/ig, this.iconColor)
            return icons; 
        }
    },
    methods: {
        
    }
}
</script>
<style lang="less" scoped>
.refresh-content{
    height: 60ipx;
    position: relative;
    .icon-refresh-bg, .icon-refresh-main{
        width: 36ipx;
        height: 36ipx;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20ipx;
        // transition: all 300ms ease-in;
        z-index: 0;
        img {
            width: 36ipx;
            height: 36ipx;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }
    .icon-refresh-main {
        z-index: 2;
        
      
    }
    .animate-loading{
        animation: refreshLoading 1s infinite 0s;
        overflow: hidden;
    }
    .text{
        position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
    }
}

@keyframes refreshLoading
{
    from {
        height: 0%;
    }
    to {
        height: 100%;
    }
}

@-webkit-keyframes refreshLoading
{
    from {
        height: 0%;
    }
    to {
        height: 100%;
    }   
}
</style>
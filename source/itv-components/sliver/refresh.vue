<template>
    <div class="refresh-content">
        <!-- <div class="icon-refresh-bg" :style="{'height':height, transform:`translateX(-50%) scale(${scale})`}">
            <img :src="icon" />
        </div>
        <div class="icon-refresh-main" :class="{'animate-loading': value}" :style="{'height':height, transform:`translateX(-50%) scale(${scale})`}">
            <img :src="main" />
        </div> -->

        <arrow class="arrow" :class="{'active': -triggerDir > top}"  v-if="!value"  :fillColor="refreshLayerColor"/>
        <spinner v-show="value" :style="{fill: refreshLayerColor, stroke: refreshLayerColor}"/>


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
import Spinner from "./Spinner.vue";
import Arrow from "./Arrow.vue";

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
        
        refreshLayerColor: {
            type: String,
            default: "#AAA"
        },

        loadingLayerColor: {
            type: String,
            default: "#AAA"
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
    components: {
        Spinner,
        Arrow
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
@import 'itv-sliver.less';
</style>
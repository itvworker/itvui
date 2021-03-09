<template>
    <div class="itv-slivers-box" 
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @touchcancel="touchend"
     >
    <div class="itv-slivers-scroller" ref="scroller">
        <div class="itv-slivers-refresh" ref="pull" v-if="refreshLoad">
            <slot name="pull">
                <refresh-bar v-model="isRefresh" :top="domPy" :triggerDir="refreshHeight"></refresh-bar>
            </slot>
        </div>
        
        <div class="itv-sliver-top" @touchstart="touchType='header'"   ref="header" :style="{height: headerHeight+'px'}">
            <div class="itv-sliver-top-content">
                <slot name="header"></slot>
                
            </div>
        </div>
        <div class="itv-slivers-group" :style="{height:contentHeight+'px'}"  @touchstart="touchType='group'" ref="group">
            <slot></slot>
        </div>
    </div>    
    </div>
</template>
<script>

import touch from './mixins/touch'
import render from '../../libs/render'
import slideHeight  from '../../libs/scale.render.js'
import calcscroll from './mixins/calcscroll'
import animate from './mixins/animate.scroller'
import refreshBar from './refresh.vue'
import sliverScroll from './mixins/animte.sliver'
export default {
    name:"sliver-container",
    mixins: [
       touch,
       calcscroll,
       animate,
       sliverScroll 
       
    ],
    components: {
       refreshBar
    },
    props: {    
        //头部的最小高度
        headerMinHeight: {
            type: Number,
            default:  44
        },
        //头部的最大高度
        headerMaxHeight: {
            type: Number,
            default:  250
        },
        //是开启触发下拉刷新
        refreshLoad: {
            type: Boolean,
            default: false,
        },
        //下拉刷新触发的距离
        refreshHeight: {
            type: Number,
            default: 60
        },
        //是否开启顶部弹动
        bounceTop: {
            type: Boolean,
            default: false
        },
        //字滚动元素索引
        sliverIndex: {
            type: Number,
            default: 0
        },
        speed: {
            type: Number,
            default: 60
        },
        percent: {
            type: Number,
            default: 0.92
        },
        id: {
            type: String,
            default:"slivers"
        }
    },
    watch: {
        headerMaxHeight(n,o) {
            this.headerHeight = n;
            this.headerDom = slideHeight(this.$refs.header, this.$refs.group, this.headerMaxHeight)
            this.scrollerDom = render(this.$refs.scroller);
            this.contentHeight = this.$el.clientHeight - this.headerMinHeight
        }
    },
    data() {
        return {
            //头部高度，改此值将触发，vue刷新
            headerHeight: this.headerMaxHeight,
            //头部高度，改变此不会触发vue更新dom,此值只用于dom操作
            headerDomHeight: this.headerMaxHeight,
            py:0,
            domPy:0,
            bouncePy:0,//回弹的位置
            StepPy: 0,
            isRefresh: false,

            //存储手指滑动队列
            touchMoveList:[],
            //touch事件开始的触发点
            startX:0,
            startY: 0,

            //touchmove上一次触发点
            passMoveX:0,
            passMoveX:0,
            //touchmove 当前的触发点
            moveX: 0,
            moveY: 0,
            stepY: 0,//滚动动画每一步的速度
            isTouch: false,//是否已经触屏
            //dom操方法
            headerDom: "",
            scrollerDom:"",
            //touchmove的滑动方法  Horizontal为横向 vertical为竖向
            moveDirection: "horizontal",
            //touchmove是否有滑动，1向上 2向下 3向左 4向右 0未滑动
            touchDirection: 0,
            childrenSlivers:[],
            stopStep: 0.5, //当sStepX,sStepY绝对值小于0.5停止滚动
            nowSliver:'', //当前所处的子元素
            touchType: '',
            contentHeight: 0
        };
        
    },

    mounted() {     
        //初始化
        this.headerDom = slideHeight(this.$refs.header, this.$refs.group, this.headerMaxHeight)
        this.scrollerDom = render(this.$refs.scroller);
        this.contentHeight = this.$el.clientHeight - this.headerMinHeight


    },
    methods: {
        //下拉刷新复位
        refresh() {
            if(this.domPy < 0) {
                let speed = this.calcStep(this.domPy, 1.2);
                this.bouncePy = 0;
                // this.isRefresh = false;
                this.bounceAnimate(speed);
            }
            this.contentHeight = this.$el.clientHeight - this.headerMinHeight
        },
        /**
         * 设置header的高度
         */
        setHeaderHeight(value) {
            this.headerDom(value);
        }
        
    },
        
}
</script>
<style lang="less">
@import '../../assets/css/itv-theme.less';
@import 'itv-sliver-container.less';
</style>
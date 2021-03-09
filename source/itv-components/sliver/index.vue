<template>
    <div class="itv-sliver" >
        <div class="itv-sliver-scroller" ref="scroller">
            <div class="itv-sliver-refresh" ref="pull" v-if="refreshLoad">
                <slot name="pull">
                    <refresh-bar v-model="isRefresh" :top="domY" :triggerDir="refreshHeight"></refresh-bar>
                </slot>
             </div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import render from '../../libs/render'
import refreshBar from './refresh.vue'
export default {
    name: 'sliver',
    components: {
        refreshBar
    },
    props: {
        index: {
            type: Number,
            default: 0
        },
        //是否开启顶部弹动
        bounceTop: {
            type: Boolean,
            default: false
        },
        //是开启触发下拉刷新
        refreshLoad: {
            type: Boolean,
            default: false,
        },
        //触发下拉刷新高度
        refreshHeight: {
            type: Number,
            default: 60
        },
         percent: {
            type: Number,
            default: 0.95
        },
        bounceBottom: {
            type: Boolean,
            default: false,
        },
        pid: {
            type: String,
            default:"slivers"
        }
    },
    data() {
        return {
            componentName:'sliver',
            maxY: 0, //最大滚动高度
            y: 0, //滚动值，会触发vue更新dom
            domY: 0, //滚动值，不会触发vue更新dom，直接更新dom，不经过vue
            isRefresh: false, //是否处于刷新状态
            scrollDom:'', //dom位置更新方法
            isTouch: false,
            bounceY:0,
            stepY:0,
            stopStep: 0.5,
            bounceStatus: 0 //0 下拉， 1 上拉
        }
    },
    methods:{
        refresh() {
            this.isRefresh = false;
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
       
            
            this.maxY = Math.max(ph - parent.clientHeight,0);
            if(this.domY < 0) {
                let speed = this.calcStep(this.domY, 1.2);
                this.bounceY = 0;
                this.bounceAnimate(speed);
            }
            if(this.y>=this.maxY) {
                this.scrollDom(0, this.maxY, 1) 
                this.y = - this.maxY
            }
        },
        /**
         * 计算最大滚动值
         *  */    
        calcMax() {
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.maxY = Math.max(ph - parent.clientHeight,0);
        },
        cache() {
            this.vy = this.y;
        },
        setPosition() {
            this.scrollDom(0, this.domY, 1)
        },
    
        //父元素回弹动画
        bounceAnimate(speed) {
           
            this.stepY = speed;
            window.requestAnimationFrame(this.bounceStep);     
        },

        bounceStep() {
            if(this.isTouch) return;
            if(this.stepY===0) {
                this.$emit('stopscroll',{
                    y: this.domY
                })
                if(this.bounceY===0) {
                    this.isRefresh = false;
                }
                return
            }
            this.domY += this.stepY;
            
            if(this.domY>this.bounceY && this.bounceStatus === 0) {
                this.domY = this.bounceY;
                this.stepY = 0;
            }

            if(this.domY<this.bounceY && this.bounceStatus === 1) {
                this.domY = this.bounceY;
                this.stepY = 0;
            }
            this.scrollDom(0,this.domY,1);
            window.requestAnimationFrame(this.bounceStep);
            
        },
        /**
         * 计滚动到一定距离的stepX,stepY的开始步数
         * @param {Number} distance 
         */
        calcStep(distance, num) {
            let dis = Math.abs(distance);
            if(dis===0) {
                return 0
            }
            let step = this.stopStep; 
            let numDis = 0;
            while(numDis<dis) {
                numDis+= step/this.percent
                step = step/this.percent
            }

            step = step/this.percent
            return step*num
        },
    
        
        //滚动到指定位置
        /**
         * 
         * @param {Number} x 
         * @param {Number} y 
         * @param {Nubmer} value 速度倍数 
         */
        scrollTo(x,y,value=1) {
            this.scrollToX =x;
            this.scrollToY = y;
            let dx = this.scrollX - x;
            let dy = this.scrollY - y;
            this.sStepY = dy > 0? this.calcStep(dy):-this.calcStep(dy)
            this.sStepX = dx > 0? this.calcStep(dx):-this.calcStep(dx)
            this.sStepX*=value
            this.sStepY*=value
            window.requestAnimationFrame(this.step);                 
        },
       
        //
        animate(speed, value) {
            if(this.isTouch) {
                this.stepY = 0;
                return
            }
            this.stepY = speed.y;
            if(this.stepY===0) {
                this.$emit('stopscroll',{
                    y: this.domY
                })
            
                return 
            }
            window.requestAnimationFrame(this.srollStep);
        },
      
        //滚动动画
        srollStep(time, value) {
            //向上滚动
            if(this.isTouch) {
                this.stepY = 0;
                return
            }

            if(Math.abs(this.stepY)<1) {
                this.stepY = 0;
                return;
            }
            if(this.stepY < 0) {
                let y = this.stepY;
                if(this.headerDomHeight >= this.headerMinHeight) {
                    this.headerDomHeight += this.stepY;
                    if(this.headerDomHeight < this.headerMinHeight) {
                        y = this.headerMinHeight - this.headerDomHeight
                        this.headerDomHeight= this.headerMinHeight;
                    }
                    this.headerDom(this.headerDomHeight)
                }
                
                this.nowSliver.touchmove(-y)

            }
            //向下滚动
            if(this.stepY>0) {
                let y = this.stepY;
                if(this.nowSliver.domY >0) {
                    this.nowSliver.touchmove(y)
                }else{
                    if(this.headerDomHeight <= this.headerMaxHeight) {
                        this.headerDomHeight += this.stepY;
                        if(this.headerDomHeight > this.headerMaxHeight) {
                            this.headerDomHeight= this.headerMaxHeight;
                        }
                        
                        this.headerDom(this.headerDomHeight)
                    }
                }


                
                // this.headerDom(this.headerDomHeight)
            }

           
            this.stepY *= this.percent;
            window.requestAnimationFrame(this.srollStep)
        },
        getParentSliver() {
            let parent = this.$parent;

            
            while(parent.id !== this.pid && parent) {
                parent = parent.$parent
            }   

            if(parent.id === this.pid){
                this.parent =  parent
            }
            
        },
        sliverIndex() {
            this.parent.nowSliver = this;
        }
    },
    mounted() {
        this.getParentSliver()
        this.scrollDom = render(this.$refs.scroller)
        this.refresh();
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-sliver.less';
</style>
<template>
    <div class="itv-sliver" >
        <div class="itv-sliver-scroller" ref="scroller">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import render from '../../libs/render'
export default {
    name: 'sliver',
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
        //是否开启下拉刷新
        refreshStatus: {
            type: Boolean,
            defualt: false
        },
        //触发下拉刷新高度
        refreshHeight: {
            type: Number,
            defualt: 60
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
            
        }
    },
    methods:{
        refresh() {
            this.isRefresh = false;
            let dom = this.$refs.scroller;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.maxY = ph - parent.clientHeight || 0;
            if(this.y>=this.maxY) {
                this.scrollDom(0, this.maxY, 1) 
                this.y = - this.maxY
            }
        },
        cache() {
            this.vy = this.y;
        },
        setPosition() {
            this.scrollDom(0, this.domY, 1)
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
        //计算touch结束后的滑动速度
        calcMoveSpeed() {
            let touchList = this.touchMoveList;
            this.touchMoveList = [];
            let num = touchList.length
            if(num > 20) {
                touchList = touchList.slice(num-20, num)
            }
            let last = touchList.length-1;
            let first = 0;
            for(let i = last; i >= 0; i--) {
                if(touchList[last].time-touchList[i].time > this.speed) {
                    first = i+1;
                    break
                }
                first = i;
            }
            let x = touchList[last].x-touchList[first].x 
            let y = touchList[last].y-touchList[first].y

            if(Math.abs(y) < 10) {
                y = 0
            }

            if(Math.abs(x) < 0) {
                x = 0
            }

            
            if(this.moveDirection === 'vertical') {
                x = 0;
            }

            if(this.moveDirection === 'horizontal') {
                y = 0;
            }
            
            return {
                x: x,
                y: y
            }
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
                    y: this.nowSliver.domY
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
        }
    },
    mounted() {
        this.scrollDom = render(this.$refs.scroller)
        this.refresh();
    }
}
</script>
<style lang="less" scoped>
.itv-sliver{
    width: 100%;
    flex: 0 0 auto;
    height: 100%;
    overflow: hidden;
    .itv-sliver-scroller{
        transition: all 0ms ease 0s;
    }
}
</style>
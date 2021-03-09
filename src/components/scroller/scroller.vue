<template>
    <div class="itv-scroller" ref="out" @touchstart="touchstart($event)" @touchmove="touchmove($event)" @touchend="touchend($event)" @touchcancel="touchend($event)" >
        <div class="itv-scroller-silde" :class="{'itv-scroller-animate': !isTouch }" ref="slide"  >
            <slot />
            <!-- <div class="itv-scroller-content" ref="main">
                <div class="itv-scroller-refresh">
                    下拉刷新
                </div>
                <slot />
            </div> -->
        </div>
    </div>
</template>

<script>
import render from './libs/render';
import animate from './mixins/animiate'
import dom from './mixins/dom'
export default {
    mixins:[animate, dom],
    props: {
        //手指滑动距离超过多少才能算触发了滑动
        minimumTrackingForScroll:{
            type: Number,
            default: 3
        },
        scrollX:{
            type: Boolean,
            default: true
        },
        scrollY:{
            type: Boolean,
            default: true
        },
        bounching: {
            type: Boolean,
            default: true
        },
        pullDown:{
            type: Boolean,
            default: true
        },
        pullHeight: {
            type: Number,
            default: 60
        }
    },
    mounted() {
        this.landscapeRender = render(this.$refs.slide)
        this.initOpt()   
    },
    updated() {
        this.initOpt(); 
    },
    data() {
        return  {
            opt: {
                outerWidth: 0,
                childrenlenth: 0
            },
            initialX: 0, //开始接触屏幕时的接触点
            initialY: 0, //开始接触屏幕时的接触点
            isAnimating: false, //是否在执行滚动动画
            isMove: false, //是否处理手指在滑动的情况
            enableScrollX: false,
            enableScrollY: false,
            moveList:[],
            lastMoveX: 0,
            lastMoveY: 0,
            index: 0,
            speedMultiplier: 1, //滑动时滑动的距离倍数，例如滑动了10px,如果是1是就是移动10px,如果是 2就是移动20px
            contentList:[
                {
                    maxScrollY: 0,
                    maxScrollX: 0,
                    y: 0,
                    x:0
                }
            ],
            render: [],
            landscapeRender:[],
            //滚动动画下一步走的距离
            decelerationVelocityX:0,
            decelerationVelocityY:0,
            minDecelerationVelocityX:0.3,
            minDecelerationVelocityY:0.3,
            maxDecelerationVelocityX:0.3,
            maxDecelerationVelocityY:0.3,
            
            minDecelerationScrollX: 0,
            minDecelerationScrollY: 0,
            maxDecelerationScrollX: 0,
            maxDecelerationScrollY: 0,

            penetrationDeceleration: 0.03,
            penetrationAcceleration: 0.08,

            refreshStatus: false,

            //-----
            allWidth: '',
            outerWidth: '',
            x:0,
            maxScollerX: 0,
            isTouch: false
        }

    },
    methods: {
        changeTab(index) {
            this.index = index;
            this.x =  this.index*this.opt.outerWidth;
            this.landscapeRender(this.x, 0 , 1);
        },
        initOpt() {
            this.opt={
                outerWidth: this.$refs.out.clientWidth ,
                childrenlenth: this.$children.length
            }      
        },    
        touchstart(e) {
            this.enableScrollY = false;
            this.enableScrollX = false;
            this.isTouch = true;
            this.maxScollerX = Math.max((this.opt.childrenlenth-1)*this.opt.outerWidth, 0);
            this.render = render(this.$children[this.index].$el.children[0]);
            this.refreshStatus = false;
            this.calcMax();
            this.isAnimating = false;
            if (e.target.tagName.match(/input|textarea|select/i)) {
                return
            }
            let touches = e.touches;
            let timeStamp = e.timeStamp;

            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            

            // 两只手指滑动处理中心点
            let currentTouchLeft, currentTouchTop;
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            } else {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }

            this.initialX = currentTouchLeft;
            this.initialY = currentTouchTop;
            this.lastMoveX = currentTouchLeft;
            this.lastMoveY = currentTouchTop;
        },
        touchmove(e) {

            e.preventDefault();
            let touches = e.touches;
            let timeStamp = e.timeStamp;
            var currentTouchLeft, currentTouchTop;

            // 计算基于手指中心的移动
            if (touches.length === 2) {
                currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            } else {
                currentTouchLeft = touches[0].pageX;
                currentTouchTop = touches[0].pageY;
            }

            //当处于滑动情况时
            if(this.isMove) {
                let moveX = currentTouchLeft - this.lastMoveX;
                let moveY = currentTouchTop - this.lastMoveY;
                let y = this.$children[this.index].y;
                let maxY = this.$children[this.index].maxScrollY;
                let x = this.x;
                if (this.enableScrollY && this.scrollY) {
                    if((y < 0 && moveY>0)||(y > maxY && moveY<0)) {

                        moveY = moveY/2
                    }
                    y -= moveY * this.speedMultiplier;
                    this.$children[this.index].y = y;
                    this.render(0, y,1);
                }

                if (this.enableScrollX && this.scrollX) {
                    x -= moveX * this.speedMultiplier;
                
                    
                    if(x < 0 || x > this.maxScollerX) {
                        this.x -= moveX/2 * this.speedMultiplier;
                        x = this.x;   
                    }


                   
                    
                    this.x = x;
                    this.landscapeRender(x, 0 , 1);
                }

                
                this.lastMoveX = currentTouchLeft;
                this.lastMoveY = currentTouchTop;

                this.moveList.push({
                    x: currentTouchLeft,
                    y: currentTouchTop,
                    timeStamp: e.timeStamp
                });

              

            }
            //当还未处于滑动情况时
            if(!this.isMove) {
                let distanceX = Math.abs(currentTouchLeft - this.initialX);
                let distanceY = Math.abs(currentTouchTop - this.initialY);
                this.enableScrollY =  distanceY >= this.minimumTrackingForScroll;
                this.enableScrollX =  distanceX >= this.minimumTrackingForScroll;

                if(Math.abs(distanceX) >= Math.abs(distanceY)) {
                    this.enableScrollY = false
                     this.isMove = true;  

                }else{
                     this.isMove = true;
                    this.enableScrollX = false  
                }

                // if(this.enableScrollY){
                //     this.isMove = true;
                //     this.enableScrollX = false;
                // }
                // if(this.enableScrollX){
                //     this.isMove = true;
                //     this.enableScrollY = false;
                // }

                this.moveList.push({
                    x: currentTouchLeft,
                    y: currentTouchTop,
                    timeStamp: e.timeStamp
                })

            }

            if(this.moveList.length > 10) {
                this.moveList.splice(0,1);
            }


        },
        touchend(e) {
            this.isTouch  =false;
            this.isMove = false;
            if(this.moveList.length<=0) return
            let timeStamp = e.timeStamp;
            let lastMoveTime =  this.moveList[this.moveList.length-1].timeStamp;

            if(this.enableScrollX) {
                if(this.x < 0) {
                    this.landscapeRender(0,0,1);
                    this.x = 0;
                    this.index = 0;
                    return
                }

                if(this.x > this.maxScollerX) {
                    this.landscapeRender(this.maxScollerX, 0 ,1);
                    this.x = this.maxScollerX;
                    
                    return
                }
                
                let closeDis = this.x - this.opt.outerWidth*this.index;
                
                
                       
                if(closeDis>0 && closeDis >= 60) {
                    this.index = this.index+1;
                    this.x = this.index*this.opt.outerWidth
                    this.landscapeRender(this.x, 0 ,1);
                    this.$emit('ontab', this.index)
                    return
                }

                if(closeDis>0 && closeDis < 60) {
                    this.x = this.index*this.opt.outerWidth
                    this.landscapeRender(this.x, 0 ,1);
                    return
                }


                if(closeDis<0 && closeDis <= -60) {
                    this.index = this.index-1;
                    this.x = this.index*this.opt.outerWidth
                    this.landscapeRender(this.x, 0 ,1);
                    this.$emit('ontab', this.index)
                    return
                }

                if(closeDis< 0 && closeDis > -60) {
                    this.x = this.index*this.opt.outerWidth
                    this.landscapeRender(this.x, 0 ,1);
                    return
                }
                return
            }
            

            
            let dom = this.$children[this.index];
            if(dom.y < 0 ) {
                if(dom.y <= -this.pullHeight) {
                    this.decelerationVelocityY = -20
                    this.refreshStatus = true;
                    this.animate();
                    return
                }
                if(dom.y < 0 && dom.y > -this.pullHeight) {
                    this.decelerationVelocityY = -10
                    this.animate();
                    return;
                }
            }

            if(dom.y > dom.maxScrollY ) {
                this.decelerationVelocityY = 18;
                this.animate();
                return;
            }


            if(timeStamp-lastMoveTime < 100) {
                let positions = this.moveList;
                let endPos = this.moveList.length - 1;
                let startPos = endPos;

                //计算100ms内，上一点在哪一个触发位置
                for (let i = endPos; i >= 0 && positions[i].timeStamp > (lastMoveTime - 100); i --) {

                    startPos = i;
                }

                if (startPos !== endPos) {
                    
                    var timeOffset = positions[endPos].timeStamp - positions[startPos].timeStamp ;
                    var movedLeft = positions[endPos].x - positions[startPos].x;
                    var movedTop = positions[endPos].y - positions[startPos].y;

                    // Based on 50ms compute the movement to apply for each render step
                    this.decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
                    this.decelerationVelocityY = movedTop / timeOffset * (1000 / 60);

                    this.animate()

                }

            }

        },
        refresh() {
            this.$emit('refresh')
            setTimeout(()=>{
                // this.restartRefresh()
            },3000)
        }
    }
}
</script>
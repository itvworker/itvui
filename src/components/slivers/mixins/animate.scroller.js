import { timers } from "jquery";

export default {
    methods: {
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
        //父元素回弹动画
        bounceAnimate(speed) {
            this.stepPy = speed;
            window.requestAnimationFrame(this.bounceStep);     

        },

        bounceStep() {
            if(this.isTouch) return;
            if(this.stepPy===0) {
                this.$emit('stopscroll',{
                    y: this.nowSliver.domY
                })
                if(this.bouncePy===0) {
                    this.isRefresh = false;
                }
                return
            }
            this.domPy += this.stepPy;
            
            if(this.domPy>this.bouncePy) {
                this.domPy = this.bouncePy;
                this.stepPy = 0;
            }
            this.scrollerDom(0,this.domPy,1);
            window.requestAnimationFrame(this.bounceStep);
            
        },

       
        //滚动动画，
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
    }
}

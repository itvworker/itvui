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
            
        }
    }
}

export default {
    methods: {
        //srcoller 滚动到哪，即回弹
        scrollerTo(x,y,value=1) {
            this.ptoX =x;
            this.ptoY =y;
            let dx = this.px - x;
            let dy = this.py - y;
            this.pStepY = dy > 0? this.calcStep(dy,2):-this.calcStep(dy,2)
            
            this.pStepX = dx > 0? this.calcStep(dx,2):-this.calcStep(dx,2)
            this.pStepX*=value
            this.pStepY*=value
            window.requestAnimationFrame(this.scrollerStep);  
        },
        //滚动动动画
        scrollerStep() {
            if(this.isTouch) return;
            let scrollY = this.py - this.pStepY;
            this.py = scrollY;
           
            if(this.py <= this.ptoY) {
                
                this.py = this.ptoY;
            }

            this.scrollerDom(0, -this.py, 1)
            this.$emit('pull', this.py)
            if(Math.abs(this.pStepY) <=0.8 || this.py === this.ptoY) {
                this.pStepY =0 ;
                this.py  = this.ptoY;
                this.scrollerDom(0, -this.py, 1)
                this.$emit('pull', this.py)
                return
            }

            this.pStepY *= this.percent;
            window.requestAnimationFrame(this.scrollerStep)
        }
    }
}
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
       
        //
        animate(speed, value) {
            
            this.sStepX = speed.x;
            this.sStepY = speed.y;
            
        

            if(this.cacheDir === 'vertical') {
                this.sStepX = 0;
            }
           
            if(Math.abs(this.sStepX) <= this.stopStep) {
                this.sStepX = 0
            }

            if(Math.abs(this.sStepY) <= this.stopStep) {
                this.sStepY = 0
            }

            if(this.sStepY===0 && this.sStepX === 0) {
                this.$emit('stopscroll',{
                    x: this.sx,
                    y: this.sy
                })
            
                return 
            }
           
            console.log(this.sStepY);
            window.requestAnimationFrame(this.srollStep);
        },
      
        //滚动动画
        srollStep(time, value) {
            let continuing = true;
            if(this.isTouch) return;
        
           
            // let scrollX = this.sx - this.sStepX
            

            let scrollY = this.sy + this.sStepY


            //如超出最大滚动值时
            if(scrollY <= -this.sMaxY){
                this.scrollDom(0, this.sMaxY, 1) 
                this.sy = -this.sMaxY
                this.$emit('scroll', {
                    max: this.sMaxY,
                    scroll: this.sy
                })
                return;
            };
            
           
            if(scrollY >= 0) {
                this.scrollDom(0, 0, 1) 
                this.sy = 0
                this.$emit('scroll', {
                    max: this.sMaxY,
                    scroll: this.sy
                })
                return
                
            }
            // if(scrollY<=0) {


            //     console.log('----------------');
            //     this.scrollDom(0, 0, 1) 
            //     this.sy = 0;
            //     return
            // }
           
            
            this.scrollDom(0, -scrollY, 1) 
            this.$emit('scroll', {
                max: this.sMaxY,
                scroll: this.sy
            })
            if(Math.abs(this.sStepY) <=0.8) {
                this.sStepY =0 ;
                return
            }
            // this.sStepX = this.sStepX * this.percent;
            this.sStepY = this.sStepY * this.percent;
            this.sy = scrollY;
            console.log(this.sy);
          
            
            window.requestAnimationFrame(this.srollStep)
        }
    }
}

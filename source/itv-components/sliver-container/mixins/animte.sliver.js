
let indexNum = 0
export default {
    methods: {
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

            indexNum++
            
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
          
         
           
            //向上滚动
            if(this.stepY < 0) {
                let y = this.stepY;
                  
                if(this.headerDomHeight > this.headerMinHeight) {
                    this.headerDomHeight += this.stepY;
                    if(this.headerDomHeight < this.headerMinHeight) {
                        y = this.headerMinHeight - this.headerDomHeight
                        this.headerDomHeight= this.headerMinHeight;
                        this.nowSliver.calcMax()
                    }
                   
                    this.headerDom(this.headerDomHeight)
                    
                }
                
                
                if(this.nowSliver.domY < this.nowSliver.maxY) {
                    
                    this.nowSliver.domY-= this.stepY;
                    if(this.nowSliver.domY > this.nowSliver.maxY) {
                        this.nowSliver.domY = this.nowSliver.maxY;
                        this.stepY =0;
                    }
                    this.nowSliver.setPosition()

                    console.log('------- d');
                    
                }
                
            }
            //向下滚动
            if(this.stepY>0) {
               
                let y = this.stepY;
                
                
                if(this.nowSliver.domY > 0) {
                    
                    this.nowSliver.domY-= y;
                    if(this.nowSliver.domY < 0) {
                        this.nowSliver.domY = 0
                    }
                    
                    this.nowSliver.setPosition()
                    
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

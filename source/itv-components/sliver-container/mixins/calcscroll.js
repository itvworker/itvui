

export default {
    mounted() {
        // setTimeout(()=>{
        //     this.scrollTo(1000, 1000)
        // },3000)
        // setTimeout(()=>{
        //     this.scrollTo(1000, 200)
        // },6000)
       
    },
    computed: {
        
          
    },
    methods: {
        
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
        }
    }
}
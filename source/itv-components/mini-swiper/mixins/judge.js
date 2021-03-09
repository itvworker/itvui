export default {
    computed: {
        thirdOne() {
            return parseInt(this.elSize/3)
        },
        //是否满足循环需求
        isLoop() {
            return this.number >2 && this.loop 
        },
        //现在所处大小
        nowPosition() {
            return this.nowIndex*this.elSize
        }
    },
    methods: {
        //判断是否为尽到滑动还要向尽头滑
        isMoveMax(value) {
            
            // if (this.direction === 'row') {
            //     if(this.coordinate<0 && value>0) return true
            //     if(this.coordinate>this.moveMax && value<0) return true
            // }

           
            if(this.coordinate<0 && value>0) return true
            if(this.coordinate>this.moveMax && value<0) return true    
            
           
            return false
        },
        //滑动后是切换到下张，还是上一张,
        isSpeedDir() {
            let remain = this.coordinate - this.nowIndex*this.elSize;
            if(remain > 0 && remain > this.thirdOne) {
                return 'next' //下一张
            }

            if(remain < 0 && Math.abs(remain) > this.thirdOne) {
                return 'prev' //上一张
            }

            return 'now' //不变当前张
        },
        

    }
}
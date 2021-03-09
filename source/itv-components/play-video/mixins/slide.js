export default {
    data() {
        return {
            isTouch: false, //是否在在触屏
        }
    },
    methods: {
        //
        screenTouchstart(e) {
            let self = e.targetTouches
            if (self.length <= 1) {
                this.startX = self[0].pageX
                this.startY = self[0].pageY
                this.moveX = this.startX
                this.moveY = this.startY
                this.isTouch = true
            }
            this.forBackTime = this.currentTime
            this.start++
            this.slideType = ''
        },
        screenTouchmove(e) {
            if (!this.isTouch) {
                return false
            }
            e.preventDefault()

            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY
            let obj = this.getDirection(this.moveX, this.moveY, x, y)
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.isMove) {
                
                // if (obj.type === 1 || obj.type === 2) {
                //     console.log()

                //     // if (x > this.screenWidth / 2) {
                //     //     // this.screenType = 'sound';
                //     // } else {
                //     //     // this.screenType = 'light';
                //     //     // this.screenType = 'progress'
                //     // }
                // } else {
                //     this.screenType = 'progress'
                // }
                //1向上 2向下 3向左 4向右 0未滑动 
                if(this.rotate===90 || this.rotate ===270) {
                    if (obj.type == 1 || obj.type == 2) {
                        this.screenType = 'progress'
                    }    
                }else{
                    if (obj.type == 3 || obj.type == 4) {
                        this.screenType = 'progress'
                    }    
                }
                
                this.isMove = true
            }
            if (obj.type > 0 && this.isMove) {
                switch (this.screenType) {
                    case 'sound':
                        // this.setSound(obj)
                        break
                    case 'light':
                        // this.setLight(obj)
                        break
                    case 'progress':

                        if(this.rotate===90) {
                            obj.angx = obj.angy
                        }
                        if(this.rotate===270) {
                            obj.angx = -obj.angy
                        }

                        this.setProgress(obj)
                        break
                }
                this.moveX = x
                this.moveY = y
            }
            this.move++
        },

        screenTouchend(e) {
            this.end++
            this.isTouch = false
            this.isMove = false
            switch (this.screenType) {
                case 'progress':
                    let arr = this.forBackTime.split(':')
                    this.setVideoCurrentTime(parseInt(arr[0]) * 60 + parseInt(arr[1]))

                default:
            }
            this.screenType = ''
        },
        //设置声音
        setSound(obj) {
            if (Math.abs(obj.angy) >= 2) {
                let dec = -obj.angy / 100
                let volume = this.volume + dec
                if (volume > 1) {
                    this.target.volume = 1
                    return
                }
                if (volume <= 0) {
                    this.target.volume = 0
                    return
                }
                this.target.volume = volume
            }
        },
        //
        setLight(obj) {
            // console.log('明暗度')
        },
        //进度的调整
        setProgress(obj) {
            if (Math.abs(obj.angx) < 2) {
                return
            }
            this.calcForBackTime(obj.angx)
            //进度
        },
    },
    mounted() {
        // let self = this.$refs.screen.addEventListener;
        // self('touchstart', this.screenTouchstart);
        // self('touchmove', this.screenTouchmove);
        // self('touchend', this.screenTouchend);
    },
}

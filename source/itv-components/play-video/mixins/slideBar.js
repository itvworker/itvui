export default {
    data() {
        return {
            isLandscape: true,
            bsx: 0,
            bsy: 0,
            bmx: 0,
            bmy: 0,
            px: 0,
            propessed: '0%',
            isProgessMove: false,
        }
    },

    methods: {
        endProgessBar(e, type) {
            this.isProgessMove = false
            if (this.allTime === '00:00') {
                return
            }
            this.barTouchstart(e, type)
        },
        strartProgessBar(e, type) {
            this.isProgessMove = true
            if (this.allTime === '00:00') {
                return
            }
            this.barTouchstart(e, type)
        },

        //移动滑块
        barTouchstart(e, type) {
            if (this.allTime === '00:00') {
                return
            }
            e.preventDefault();
            let self = e.targetTouches
            if (self.length <= 0) {
                self = e.changedTouches
            }

            if (self.length <= 1) {
                this.bsx = self[0].pageX
                this.bsy = self[0].pageY
                this.bmx = this.bsx
                this.bmy = this.bsy
                if(this.rotate===90 ) {
                    this.changeProgessBar(this.bmy, type)
                    return
                }
                if(this.rotate===270 ) {
                    this.changeProgessBar(this.innerWidth-this.bmy, type)
                    return
                }
                this.changeProgessBar(this.bmx, type)
            } else {
                return
            }
        },
        barTouchmove(e) {
            e.preventDefault()
            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY
            // let obj = this.getDirection(this.moveX, this.moveY, x, y)
            //判断是否滑动并判断滑动的类型
            this.moveX = x
            this.moveY = y
        },
        changeProgessBar(x, type) {
            let progressWidth = this.$refs.progress.clientWidth
            let left = this.$refs.video.offsetLeft;
            let padding= 34;
            if(this.rotate===90 || this.rotate===270) {
                left = 0;
            }
            let width = this.$refs.video.offsetWidth
         
            if (this.isLandscape) {
                if (x <= 10) {
                    this.propessed = 0
                } else if (x >= width + left - padding) {
                    this.propessed = 100
                } else {
                    this.propessed = ((x - left - padding) / progressWidth) * 100
                }
                this.decPx()
                if (type === 'start') {
                    this.setVideoCurrentTime()
                }
                this.percentChangeTime()
            }
        },
        calcPosition() {
            // console.log(this.$refs.video.offsetLeft);
        },
        decPx(p) {
            if (this.isLandscape) {
                // let left = this.$refs.video.offsetLeft
                let px = (this.$refs.progress.clientWidth * this.propessed) / 100
                if (px <= 0) {
                    this.px = 0
                } else {
                    this.px = (this.$refs.progress.clientWidth * this.propessed) / 100
                }
            }
        },
    },
    mounted() {
        //let self = this.$refs.progress.addEventListener;
        // let self = document.querySelector('.progress-outline').addEventListener;
        // this.$refs.progress.addEventListener('touchstart', this.barTouchstart,false);
        // this.$refs.progress.addEventListener('touchmove', this.barTouchstart),false;
    },
}

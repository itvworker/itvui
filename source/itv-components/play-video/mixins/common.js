export default {
    data() {
        return {
            screenWidth: 0,
            screenHeight: 0,
            isProgess: false,
        }
    },
    methods: {
        //将时间转换为可视格式
        calcTime(currentTime, allTime) {
            if (currentTime) {
                let min = parseInt(currentTime / 60)
                min = min > 9 ? min : '0' + min
                let sec = parseInt(currentTime % 60)
                sec = sec > 9 ? sec : '0' + sec
                let time = min + ':' + sec
                if (time) {
                    this.currentTime = time
                } else {
                    this.currentTime = '00:00'
                }
            } else {
                this.currentTime = '00:00'
            }

            if (allTime) {
                let min = parseInt(allTime / 60)
                min = min > 9 ? min : '0' + min
                let sec = parseInt(allTime % 60)
                sec = sec > 9 ? sec : '0' + sec
                let time = min + ':' + sec
                if (time) {
                    this.allTime = time
                } else {
                    this.allTime = '00:00'
                }
            } else {
                this.allTime = '00:00'
            }
        },
        //计算快进后退时间
        calcForBackTime(angSec) {
            angSec = Math.floor(angSec)
            if (!this.forBackTime) return
            let duration = this.target.duration
            let arr = this.forBackTime.split(':')
            let allSec = parseInt(arr[0]) * 60 + parseInt(arr[1])

            if (Math.abs(angSec) / duration > 0.01) {
                if (angSec >= 0) {
                    angSec = Math.ceil(0.01 * duration)
                } else {
                    angSec = Math.floor(-0.01 * duration)
                }
            }

            allSec = allSec + angSec
            if (allSec < 0) {
                allSec = 0
            }
            if (allSec > duration) {
                allSec = parseInt(duration)
            }

            let min = parseInt(allSec / 60)
            min = min > 9 ? min : '0' + min
            let sec = parseInt(allSec % 60)
            sec = sec > 9 ? sec : '0' + sec
            let time = min + ':' + sec

            if (time) {
                this.forBackTime = time
            } else {
                this.forBackTime = '00:00'
            }
        },
        percentChangeTime() {
            let all = this.target.duration
            this.calcTime(parseInt((all * this.propessed) / 100), parseInt(all))
        },
        //获得角度
        getAngle(angx, angy) {
            return (Math.atan2(angy, angx) * 180) / Math.PI
        },
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy) {
            var angx = endx - startx
            var angy = endy - starty
            var result = 0
            //如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                return result
            }
            var angle = this.getAngle(angx, angy)
            if (angle >= -135 && angle <= -45) {
                result = 1
            } else if (angle > 45 && angle < 135) {
                result = 2
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3
            } else if (angle >= -45 && angle <= 45) {
                result = 4
            }
            var data = {
                type: result,
                angx: angx,
                angy: angy,
            }
            return data
        },
        hengshuping() {
            let width = this.screenWidth
            let height = this.screenHeight
            if (window.orientation == 180 || window.orientation == 0) {
                if (width >= height) {
                    this.screenWidth = height
                    this.screenHeight = width
                }
            }
            if (window.orientation == 90 || window.orientation == -90) {
                if (width <= height) {
                    this.screenWidth = height
                    this.screenHeight = width
                }
            }
            this.changeProgessBar((this.propessed / 100) * (this.screenWidth - 20))
        },
        preventMoveEvent(e) {
            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY
            let obj = this.getDirection(this.moveX, this.moveY, x, y)
            if (obj.result > 0) {
                e.preventDefault()
            }
        },
    },
    mounted() {
        this.screenWidth = document.body.clientWidth
        this.screenHeight = document.body.clientHeight
        window.addEventListener(
            'onorientationchange' in window ? 'orientationchange' : 'resize',
            this.hengshuping,
            false
        )
    },
}

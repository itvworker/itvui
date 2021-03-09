export default {
    methods: {
        animate() {
            this.isAnimating = true;
            this.minDecelerationScrollX = 0
            this.minDecelerationScrollY = 0
            this.maxDecelerationScrollX = this.$children[this.index].maxScrollX
            this.maxDecelerationScrollY = this.$children[this.index].maxScrollY
            window.requestAnimationFrame(this.step)
        },
        step() {

            if (!this.isAnimating) return;
            let x = this.$children[this.index].x;
            let y = this.$children[this.index].y;
            let maxX = this.$children[this.index].maxScrollX
            let maxY  = this.$children[this.index].maxScrollY
            y -= this.decelerationVelocityY;

            //如果没有弹动时
            if(!this.bounching) {
                if(y > maxY) {
                    y = maxY
                }
                if(y < 0) {
                    y = 0;
                }
            }

            if (this.bounching) {
                if (this.refreshStatus && this.pullDown) {
                    if (this.$children[this.index].y < -this.pullHeight && y > -this.pullHeight) {
                        y = -this.pullHeight
                        this.decelerationVelocityY = 0;
                        this.refresh();
                    }
                }
                if (y < maxY && this.$children[this.index].y > maxY) {
                    this.decelerationVelocityY = 0
                    y = maxY;
                }

                if (y > 0 && this.$children[this.index].y < 0 ) {
                    this.decelerationVelocityY = 0
                    y = 0
                }
            }


            this.$children[this.index].y = y;

            this.render(0, y, 1);
            if (Math.abs(this.decelerationVelocityY) <= 0.3) {
                if(this.refreshStatus) {
                    return;
                }else{

                    if (y > maxY) {
                        let dis = y - maxY;
                        this.decelerationVelocityY = this.calc(dis);
                        window.requestAnimationFrame(this.step)
                        return;
                    }

                    if (y < 0 ) {
                        this.decelerationVelocityY = this.calc(Math.abs(y), true);
                        window.requestAnimationFrame(this.step);
                        return;
                    }

                }

                this.isAnimating = false;
                return;
            } else {
                window.requestAnimationFrame(this.step)
            }
            this.calcDecelerationVelocity();
        },
        calcDecelerationVelocity() {
            let maxX = this.$children[this.index].maxScrollX
            let maxY  = this.$children[this.index].maxScrollY
            let x = this.$children[this.index].x;
            let y = this.$children[this.index].y;
            if (!this.bounching) {
                let scrollLeftFixed = Math.max(Math.min(this.maxDecelerationScrollX, x), this.minDecelerationScrollX);
                if (scrollLeftFixed !== x) {
                    x = scrollLeftFixed;
                    this.decelerationVelocityX = 0;
                }

                let scrollTopFixed = Math.max(Math.min(this.maxDecelerationScrollY, y), this.minDecelerationScrollY);
                if (scrollTopFixed !== y) {
                    y = scrollTopFixed;
                    this.decelerationVelocityY = 0
                }
            }

            let frictionFactor = 0.95;
            this.decelerationVelocityX *= frictionFactor;
            this.decelerationVelocityY *= frictionFactor;

            // 只有在弹动时才有效

            if (this.bounching) {
                if (this.decelerationVelocityY < 0 && y > maxY) {
                    this.decelerationVelocityY *= 0.85;
                }

                if (this.decelerationVelocityY > 0 && y < 0) {
                    this.decelerationVelocityY *= 0.85;
                }
            }

        },
        restartRefresh() {
            if(!this.refreshStatus) return;
            this.decelerationVelocityY = -6;
            this.refreshStatus =false;
            this.animate()
        },
        calc(height, value) {
            let speed = 0.9;
            let dis = 0.3;
            let l = 0;
            while (height > l) {
                dis = dis / speed ;
                l += dis;
                if (l >  height) {
                    dis *= speed ;
                }
            }
            if(value) {
               return -dis
            }else{
                return dis;
            }

        }
    }

}
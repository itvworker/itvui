<template>
    <div class="slide-bar">
        <div
            class="slide-bar-content"
            :class="{'slide-move': this.isMove}"
            ref="slide"
            @touchstart="touchstart"
            @touchmove="touchmove"
            @touchend="touchend"
           
        >
            <slot />
        </div>
        <div
            class="slide-bar-group-btn"
            ref="btns"
        >
            <slot name="meun" />
            <!--            <div class="btn" v-for="(item, index) in btns" @click="send(index)"  :style="{background: item.bgColor,  color: item.color}">{{item.name}}</div>-->
        </div>
    </div>
</template>
<script>
export default {
    name: "slide-item",
    props: {
        sensitivity: {
            type: Number,
            default: 20
        }
    },
    data() {
        return {
            name: "slide-bar",
            groupWidth: 0,
            isTouch: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            move: 0,
            end: 0,
            x: 0,
            y: 0,
            isMove: false,
            screenType: ""
        };
    },
    updated() {
        this.$nextTick(() => {
            this.init();
        });
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.groupWidth = this.$refs.btns.clientWidth;
        },
        send(value) {
            if (this.$refs.slide) {
                this.$refs.slide.style.transform = `translateX(0px)`;
                this.x = 0;
                this.$emit("btn", value);
            }
        },
        restore() {
            if (Math.abs(this.x) === this.groupWidth && this.$refs.slide) {
                this.$refs.slide.style.transform = `translateX(0px)`;
                this.x = 0;
            }
        },
        touchstart(e) {
            let self = e.targetTouches;
            if (self.length <= 1) {
                this.startX = self[0].pageX;
                this.startY = self[0].pageY;
                this.moveX = this.startX;
                this.moveY = this.startY;
                this.isTouch = true;
            }
            this.forBackTime = this.currentTime;
            this.start++;
        },
        touchmove(e) {
            if (!this.isTouch) {
                return false;
            }

            let self = e.targetTouches;
            let x = self[0].pageX;
            let y = self[0].pageY;

            let obj = this.getDirection(this.moveX, this.moveY, x, y);
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.isMove) {
                if (obj.type === 1 || obj.type === 2) {
                    if (x > this.screenWidth / 2) {
                        // this.screenType = 'sound';
                    } else {
                        // this.screenType = 'light';
                        // this.screenType = 'progress'
                    }
                } else {
                    this.screenType = "progress";
                }
                this.isMove = true;
            }

            if (this.screenType === "progress") {
                e.preventDefault();
                e.stopPropagation();
            }

            if (obj.type > 0 && this.isMove) {
                switch (this.screenType) {
                case "sound":
                    // this.setSound(obj)
                    break;
                case "light":
                    // this.setLight(obj)
                    break;
                case "progress":
                    this.moveX = x;
                    this.moveY = y;
                    this.x += obj.angx;
                    if (this.x < 0 && Math.abs(this.x) > this.groupWidth) {
                        this.$refs.slide.style.transform = `translateX(${-this
                            .groupWidth}px)`;
                        return;
                    }

                    if (this.x > 0) {
                        this.$refs.slide.style.transform = `translateX(0px)`;
                        return;
                    }

                    this.$refs.slide.style.transform = `translateX(${this.x}px)`;

                    break;
                }
            }
        },

        touchend(e) {
            this.end++;
            this.isTouch = false;
            this.isMove = false;
            switch (this.screenType) {
            case "progress":
                e.preventDefault();
                e.stopPropagation();
                if (this.x < 0 && Math.abs(this.x) >= this.sensitivity) {
                    this.x = -this.groupWidth;
                    this.$refs.slide.style.transform = `translateX(${this.x}px)`;
                } else {
                    this.$refs.slide.style.transform = `translateX(0px)`;
                    this.x = 0;
                }
            default:
            }
            this.screenType = "";
        },
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy) {
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5) {
                return result;
            }
            var angle = this.getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
                result = 1;
            } else if (angle > 45 && angle < 135) {
                result = 2;
            } else if (
                (angle >= 135 && angle <= 180) ||
                (angle >= -180 && angle < -135)
            ) {
                result = 3;
            } else if (angle >= -45 && angle <= 45) {
                result = 4;
            }
            var data = {
                type: result,
                angx: angx,
                angy: angy
            };
            return data;
        },
        //获得角度
        getAngle(angx, angy) {
            return (Math.atan2(angy, angx) * 180) / Math.PI;
        }
    }
};
</script>
<style lang="less" scoped>
.slide-bar {
    position: relative;
    > .slide-bar-content {
        position: relative;
        z-index: 10;
        transition: transform 0.3s;
    }
    > .slide-move {
        transition: transform 0.1s;
    }
    > .slide-bar-group-btn {
        position: absolute;
        right: 0;
        height: 100%;
        top: 0;
        bottom: 0;
        display: flex;
        > .btn {
            height: 100%;
            display: flex;
            align-items: center;
            padding-left: 11rpx;
            padding-right: 11rpx;
            font-size: 14rpx;
        }
    }
}
</style>

<template>
    <div class="itv-ui-box">
        <div class="itv-drawer-content" :class="{'itv-drawer-touch': isMove, 'itv-drawer-learn': !isMove, }" ref="content">
                
        </div>
        <transition  name="fade">
            <div class="itv-ui-bg" v-show="bg" @click="close"></div>
        </transition>

    </div>
</template>

<script>
    import render from './render'
    export default {
        name: 'drawer',
        data() {
            return {
                initialX: 0, //开始接触屏幕时的接触点
                initialY: 0, //开始接触屏幕时的接触点
                maxWidth: 0,
                x: 0,
                render: '',
                isMove: false,
                enableScrollY:false,
                enableScrollX:false,
                winWidth: 0,
                isClose: false,
                lastMoveX: 0,
                lastMoveY: 0,
                isOpen: false,
                bg: false

            }
        },
        methods: {
            close() {
                this.x = 0;
                this.bg = false;
                this.render(0,0,1)
            },
            touchstart(e) {
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return
                }



                let touches = e.touches;
                let timeStamp = e.timeStamp;

                //检查手指数量
                if (touches.length == null) {
                    throw new Error("Invalid touch list: " + touches);
                }

                let currentTouchLeft, currentTouchTop;
                let isSingleTouch = touches.length === 1;
                if (isSingleTouch) {
                    currentTouchLeft = touches[0].pageX;
                    currentTouchTop = touches[0].pageY;
                } else {
                    currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                    currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
                }


                if(currentTouchLeft > this.maxWidth && !this.bg){
                    this.isClose = true;
                }



                this.initialX = currentTouchLeft;
                this.initialY = currentTouchTop;
                this.lastMoveX = currentTouchLeft;
                this.lastMoveY = currentTouchTop;
            },
            touchmove(e) {
                e.preventDefault();

                if(this.isClose) {
                    return;
                }
                let touches = e.touches;
                let timeStamp = e.timeStamp;
                let currentTouchLeft, currentTouchTop;

                // 计算基于手指中心的移动
                if (touches.length === 2) {
                    currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                    currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
                } else {
                    currentTouchLeft = touches[0].pageX;
                    currentTouchTop = touches[0].pageY;
                }
                if(this.isMove) {
                    let moveX = currentTouchLeft - this.lastMoveX;
                    let x = this.x;
                    if (this.enableScrollX) {
                        x += moveX;
                        if(x > this.maxWidth) {
                            x = this.maxWidth
                        }
                        this.render(-x, 0 , 1);
                    }
                    this.x = x;
                    this.lastMoveX = currentTouchLeft;

                }
                if(!this.isMove) {
                    let distanceX = Math.abs(currentTouchLeft - this.initialX);
                    let distanceY = Math.abs(currentTouchTop - this.initialY);
                    this.enableScrollY =  distanceY >= 3;
                    this.enableScrollX =  distanceX >= 3;

                    if(this.bg) {
                        console.log('------------------------bg')
                        if(Math.abs(distanceX) >= Math.abs(distanceY) && currentTouchLeft - this.initialX<0) {
                            let x = this.x;
                            x+= currentTouchLeft - this.initialX;

                            this.x = x ;
                            this.render(-this.x, 0 , 1);
                            this.enableScrollY = false;
                            this.isMove = true;
                            this.bg = true;
                        }else{
                            this.isMove = true;
                            this.enableScrollX = false
                        }
                    }else{
                        if(Math.abs(distanceX) >= Math.abs(distanceY) && currentTouchLeft - this.initialX>0) {
                            this.render(-currentTouchLeft, 0 , 1);
                            this.enableScrollY = false;
                            this.isMove = true;
                            this.x = currentTouchLeft;
                            this.bg = true;
                        }else{
                            this.isMove = true;
                            this.enableScrollX = false
                        }
                    }


                    this.lastMoveX = currentTouchLeft;
                    this.lastMoveY = currentTouchTop;
                }

            },
            touchend(e) {
                this.isMove = false;
                this.isClose = false;
                if(this.x > this.maxWidth/2) {
                     this.x = this.maxWidth;
                     this.render(-this.x,0, 1)
                }else{
                    this.x = 0;
                    this.render(-this.x,0, 1)
                    this.bg = false;
                }
            }
        },
        mounted() {
            this.render = render(this.$refs.content);
            this.maxWidth = this.$refs.content.clientWidth;
            this.winWidth = window.screen.width;
            document.addEventListener('touchstart', this.touchstart, false);
            document.addEventListener('touchmove', this.touchmove, false);
            document.addEventListener('touchend', this.touchend, false);
        }

    };
</script>

<style lang="less" scoped>

</style>



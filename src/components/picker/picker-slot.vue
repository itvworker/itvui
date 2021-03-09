<template>
  <div class="itv-picker-list" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"  @touchcancel="touchEnd">
    <div class="itv-picker-roller" ref="roller">
        <div class="itv-picker-roller-item"
            :class="{'itv-picker-roller-item-hidden': isHidden(index + 1)}"
            v-for="(item,index) in listData"
            :style="setRollerStyle(index + 1)"
            :key="item.label ? item.label : index">
                {{(item.name || item.value || item) | formatWord(word)}}
        </div>
    </div>
    <div class="itv-picker-content" ref="height">
        <div class="itv-picker-list-panel" ref="list">
            <div class="itv-picker-item" v-for="(item,index) in listData"
                :key="item.label ? item.label : index">{{(item.name || item.value || item) | formatWord(word)}}
            </div>
        </div>
    </div>
    <div class="itv-picker-mask"></div>
    <div class="itv-picker-indicator"></div>
</div>
</template>
<script>
export default {
    name:'picker-slot',
    props: {
        listData: {
            type: Array,
            required: true
        },
        defaultValue: {
            type: String | Number
        },
        keyIndex: {
            type: Number,
            default: 0
        },
        isUpdate: {
            type: Boolean,
            default: false
        },
        lastChange: {
            type: Boolean,
            default: false
        },
        word: {
            type: String,
            default: '{value}'
        }
        
    },
    data() {
        return {
            touchParams: {
                startY: 0,
                endY: 0,
                startTime: 0,
                endTime: 0
            },
            currIndex: 1,
            transformY: 0,
            scrollDistance: 0,
            lineSpacing: 44,
            rotation: 24,
            timer: null,
            isTouch: false
        }
    },
    watch: {
        'isUpdate': function() {
            this.transformY = 0;
            this.modifyStatus();
        },
        'defaultValue': function() {
            // this.transformY = 0;
            // this.modifyStatus();
        },
        transformY(n,o){
            
        },
        listData(n,o) {
            if(this.lastChange){
                let lineIndex = Math.abs(parseInt(this.scrollDistance/this.lineSpacing));
                let index = Math.min(n.length-1, lineIndex)
                this.scrollDistance = -index*this.lineSpacing
                this.transformY = this.scrollDistance
                this.modifyStatus()
            }
        }
    },
    methods: {
        updateTransform(value) {
            
            if (value) {
                this.transformY = 0;
                this.timer = setTimeout(() => {
                    this.modifyStatus(null, value);
                }, 10);
            }
        },

        setRollerStyle(index) {
            return `transform: rotate3d(1, 0, 0, ${-this.rotation * index}deg) translate3d(0px, 0px, 104px)`;
        },

        isHidden(index) {
            if (index >= this.currIndex + 8 || index <= this.currIndex - 8) {
                return true;
            } else {
                return false;
            }
        },

        setTransform(translateY = 0, type, time = 1000, deg) {
            if (type === 'end') {
                this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
                this.$refs.roller.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
            } else {
                this.$refs.list.style.webkitTransition = '';
                this.$refs.roller.style.webkitTransition = '';
            }
            this.$refs.list.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
            this.$refs.roller.style.webkitTransform = `rotate3d(1, 0, 0, ${deg})`;
            this.scrollDistance = translateY;
        },

        setMove(move, type, time) {
            let updateMove = move + this.transformY;
            if (type === 'end') {
                // 限定滚动距离
                if (updateMove > 0) {
                    updateMove = 0;
                }
                if (updateMove < -(this.listData.length - 1) * this.lineSpacing) {
                    updateMove = -(this.listData.length - 1) * this.lineSpacing;
                }

                // 设置滚动距离为lineSpacing的倍数值
                let endMove = Math.round(updateMove / this.lineSpacing) * this.lineSpacing;
                let deg = `${(Math.abs(Math.round(endMove / this.lineSpacing)) + 1) * this.rotation}deg`;
                this.setTransform(endMove, type, time, deg);
                this.timer = setTimeout(() => {
                    this.setChooseValue(endMove);
                }, time / 2);

                this.currIndex = (Math.abs(Math.round(endMove/ this.lineSpacing)) + 1);
            } else {
                let deg = '0deg';
                if (updateMove < 0) {
                    deg = `${(Math.abs(updateMove / this.lineSpacing) + 1) * this.rotation}deg`;
                } else {
                    deg = `${((-updateMove / this.lineSpacing) + 1) * this.rotation}deg`;
                }

                this.setTransform(updateMove, null, null, deg);
                this.currIndex = (Math.abs(Math.round(updateMove/ this.lineSpacing)) + 1);
            }
        },
        setLastValue(index) {

            this.setChooseValue(-this.lineSpacing*index)
        },
        setChooseValue(move) {
            if(this.isTouch) return;
            let index = Math.round(-move / this.lineSpacing)
            this.$emit('chooseItem', this.listData[index], this.keyIndex, index);
        },

	    touchStart(event) {
            this.isTouch = true
            event.preventDefault();
            let changedTouches = event.changedTouches[0];
            this.touchParams.startY = changedTouches.pageY;
            this.touchParams.startTime = event.timestamp || Date.now();
            this.transformY = this.scrollDistance;
            
            
        },

        touchMove(event) {
            event.preventDefault();

            let changedTouches = event.changedTouches[0];
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.lastTime = event.timestamp || Date.now();
           
            let move = this.touchParams.lastY - this.touchParams.startY;
            this.setMove(move);
        },

        touchEnd(event) {
            this.isTouch = false
            event.preventDefault();

            let changedTouches = event.changedTouches[0];
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.lastTime = event.timestamp || Date.now();
            let move = this.touchParams.lastY - this.touchParams.startY;

            let moveTime = this.touchParams.lastTime - this.touchParams.startTime;
            if (moveTime <= 300) {
                move = move * 2;
                moveTime = moveTime + 1000;
                this.setMove(move, 'end', moveTime);
            } else {
                this.setMove(move, 'end');
            }
            this.isTouch = false
        },

        modifyStatus (type, defaultValue) {
            let style = window.getComputedStyle(this.$refs.roller)

            this.lineSpacing = parseFloat(style.height);
            this.rotation = this.lineSpacing/2+2;
            // console.log(this.lineSpacing)
            defaultValue = defaultValue ? defaultValue : this.defaultValue;
            let index = this.listData.indexOf(defaultValue);
            this.currIndex = index === -1 ? 1 : (index + 1);
            let move = index === -1 ? 0 : (index * this.lineSpacing);
            type && this.setChooseValue(-move);
            this.setMove(-move);
        },
    },
    
    mounted() {
        this.lineSpacing = this.$refs.height.clientHeight;

        this.$nextTick(() => {
            this.modifyStatus(true);
          
        });
     
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    },
    filters: {
        formatWord(value, format) {
            
            if(!value) return ''
           
           
            return format.replace('{value}',value)
        }
    }
}
</script>
<style lang="less" scoped>
@import 'picker.less';
</style>

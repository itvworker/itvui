<template>
  <div class="itv-picker-list" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"  @touchcancel="touchEnd">
   
    <div class="itv-picker-content" :class="['itv-picker-row'+rows]"    ref="height" @transitionEnd="transitionEnd"  @webkitTransitionEnd="transitionEnd" >
        <div class="itv-picker-list-panel"  ref="list">
            <div class="itv-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll}" v-for="(item,index) in listData" 
                :key="item.label ? item.label+'up' : index+'up'"
                >{{(item.name || item.value || item) | formatWord(word)}}
            </div>
            <div class="itv-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll}" v-for="(item,index) in listData" 
                :key="item.label ? item.label+'up1' : index+'up1'"
                >{{(item.name || item.value || item) | formatWord(word)}}
            </div>
            <div class="itv-picker-item" :style="{height: lineSpacing+'px'}"  v-for="(item,index) in listData"
                :key="item.label ? item.label : index">{{(item.name || item.value || item) | formatWord(word)}}
            </div>
            <div class="itv-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll}"  v-for="(item,index) in listData"
                :key="item.label ? item.label+'next' : index+'next'">{{(item.name || item.value || item) | formatWord(word)}}
            </div>
            <div class="itv-picker-item" :style="{height: lineSpacing+'px'}" :class="{'hide-opacity': !isLoopScroll}"  v-for="(item,index) in listData"
                :key="item.label ? item.label+'next2' : index+'next2'">{{(item.name || item.value || item) | formatWord(word)}}
            </div>
        </div>
    </div>
    <div class="itv-picker-mask"  :class="['itv-picker-row'+rows]"></div>
    <div class="itv-picker-indicator"   :class="['itv-picker-row'+rows]"></div>
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
        },
        isLoop: {
            type: Boolean,
            default: false
        },
        rows: {
            type: Number,
            default: 5
        }
        
    },
    data() {
        return {
            itemHeight: null,
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
            isTouch: false,
            moveArr:[],
            lastIndex: 0
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
    computed: {
        listLength() {
            return this.listData.length
        },
        minLast() {
            return (this.listData.length - 1) * this.lineSpacing + (this.listData.length - 3) * this.lineSpacing
        },
        maxLast() {
            return (this.listData.length - 3) * this.lineSpacing
        },
        /**
         * 是否达到循环滚动的条件
         */
        isLoopScroll() {
            return this.isLoop && this.listLength >= parseInt(this.rows/2)+1;
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
           
            let dom = this.$refs.list;
            if (type === 'end') { //手指结束滑动时走这里，给过渡动画加上时间
                dom.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
               
            } else {
               dom.style.webkitTransition = '';
               
            }
            //给过dom加上滑动所要滑动的点
            dom.style.marginTop=`-${this.lineSpacing*this.listData.length*2}px`
            dom.style.webkitTransform = `translate3d(0, ${translateY}px, 0)`;
            this.scrollDistance = translateY;
            this.transformY =  translateY;
            
        },
        /**
         * 过渡动画结束
         */
        transitionEnd() {
           
            
            let index = Math.round(-this.transformY / this.lineSpacing);
            console.log('before:'+index);
            if(index > this.listLength-1) {
                let num = index - this.listLength;
                this.transformY = -num * this.lineSpacing
            }
            if(index<0) {
                let num = this.listLength+index;
                this.transformY = -num * this.lineSpacing
            }
            index = Math.round(-this.transformY / this.lineSpacing);
            console.log('after:'+index);
            console.log(this.listData[index]);

            this.setTransform(this.transformY, null, null, 0);
            this.setChooseValue(this.transformY);
        },

        setMove(move, type, time) {
          
            this.transformY = move + this.transformY;
           
            if (type === 'end') { //手指结束滑动走这里
                // 限定滚动距离
                console.log('end:'+this.transformY);
                // if(this.isLoopScroll) {
                //     if(this.transformY > this.lineSpacing){
                //         this.transformY = this.transformY-this.listData.length  * this.lineSpacing
                //     } 

                //     if (this.transformY < -this.listData.length  * this.lineSpacing) {
                //         this.transformY = Math.abs(this.transformY) - this.listData.length * this.lineSpacing;
                        
                //     }
                // }else{
                //     this.calcOverScroll();
                // }

                if(!this.isLoopScroll) {
                    this.calcOverScroll();
                }

                // 设置滚动距离为lineSpacing的倍数值
                
                this.transformY = Math.round(this.transformY / this.lineSpacing) * this.lineSpacing;
                let deg = `${(Math.abs(Math.round(this.transformY / this.lineSpacing)) + 1) * this.rotation}deg`;
                this.setTransform(this.transformY, type, time, deg);
                // this.timer = setTimeout(() => {
                //     this.setChooseValue(endMove);
                // }, time / 2);
                    
                this.currIndex = (Math.abs(Math.round(this.transformY/ this.lineSpacing)) + 1);
            } else {
                
                let deg = '0deg';
                if(this.isLoopScroll) {
                    if(this.transformY > this.lineSpacing){
                        this.transformY = this.transformY-this.listData.length  * this.lineSpacing
                    } 

                    if (this.transformY < -this.listData.length  * this.lineSpacing) {
                        this.transformY = Math.abs(this.transformY) - this.listData.length * this.lineSpacing;
                        
                    }
                }
            
                console.log('begin:'+this.transformY);
                this.setTransform(this.transformY, null, null, deg);
                this.currIndex = (Math.abs(Math.round(this.transformY/this.lineSpacing)) + 1);
               
            }
        },
       
        setLastValue(index) {
            this.setChooseValue(-this.lineSpacing*index)
        },
        setChooseValue(move) {
            if(this.isTouch) return;
            let index = Math.round(-this.transformY / this.lineSpacing);
            this.$emit('chooseItem', this.listData[index], this.keyIndex, index);
        },
        /**
         * 计算时否超出来滚距离
         */
        calcOverScroll(touch){
            if(this.isLoopScroll && !touch) {
                if (this.transformY > this.maxLast) {
                    this.transformY = this.maxLast; 
                }
                
                if (this.transformY < -this.minLast) {
                    this.transformY = -this.minLast;
                }
            }else{
                if (this.transformY > 0) {
                    this.transformY = 0;
                }
                if (this.transformY < -(this.listData.length - 1) * this.lineSpacing) {
                    this.transformY = -(this.listData.length - 1) * this.lineSpacing;
                }
            }
        },
            
	    touchStart(event) {
            this.isTouch = true
            event.preventDefault();
            let changedTouches = event.changedTouches[0];
            this.touchParams.startY = changedTouches.pageY;
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.startTime = event.timestamp || Date.now();
            this.transformY = this.scrollDistance;
            
            
        },

        touchMove(event) {
            event.preventDefault();
            let changedTouches = event.changedTouches[0];
            let move = changedTouches.pageY - this.touchParams.lastY;
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.lastTime = event.timestamp || Date.now();
            this.moveArr.push({
                y: changedTouches.pageY,
                timestamp: event.timestamp || Date.now()
            })
            if(this.moveArr.length>20) {
               this.moveArr = this.moveArr.splice(-20,20)
            }
            this.setMove(move);
        },

        touchEnd(event) {
            this.isTouch = false
            event.preventDefault();

            let changedTouches = event.changedTouches[0];
            let move =changedTouches.pageY - this.touchParams.lastY;
            this.touchParams.lastY = changedTouches.pageY;
            this.touchParams.lastTime = event.timestamp || Date.now();
            let moveTime = this.touchParams.lastTime - this.touchParams.startTime;
            this.setMove(move);
            this.moveArr.push({
                y: changedTouches.pageY,
                timestamp: event.timestamp || Date.now()
            })
            if(this.moveArr.length>20) {
                this.moveArr = this.moveArr.splice(-20,20)
            }


            let moveDis  = this.getDistance();   
            if (Math.abs(moveDis.disY)>= 50) {
                move = moveDis.disY;
                if(Math.abs(move)>(this.listLength-1)*this.lineSpacing) {
                    if(move>=0) {
                        move = (this.listLength-1)*this.lineSpacing
                    }else{
                        move = -(this.listLength-1)*this.lineSpacing
                    }
                }

                moveTime = moveDis.timestamp + 1000;
                this.setMove(move, 'end', moveTime);
            } else {
                this.setMove(move, 'end', 300);
            }
            this.isTouch = false
        },
        /**
         * 获取100毫秒的距离和时间
         *  */
        getDistance() {
            let index = this.moveArr.length-1;
            if(index <=0) {
                return {
                    timestamp: 0,
                    disY: 0
                }
            }
            let last = this.moveArr[index];
            for(let i = index; i>=0; i--) {
                if(last.timestamp - this.moveArr[i].timestamp<300) {
                    index = i;
                }else{
                    break;
                }
            }
            if(index === this.moveArr.length-1) {
                 return {
                    timestamp: 0,
                    disY: 0
                }
            }

            return {
                timestamp: last.timestamp - this.moveArr[index].timestamp,
                disY: last.y - this.moveArr[index].y
            }
        },    
        modifyStatus (type, defaultValue) {
            this.lineSpacing = this.$refs.height.clientHeight;
            // console.log(this.lineSpacing)
            defaultValue = defaultValue ? defaultValue : this.defaultValue;
            let index = this.listData.indexOf(defaultValue);
            this.currIndex = index === -1 ? 1 : (index + 1);
            let move = index === -1 ? 0 : (index * this.lineSpacing);
            this.transformY = -move
            type && this.setChooseValue(-move);
            this.setTransform(this.transformY, null, null, 0);
            
        },
    },
    
    mounted() {
        this.lineSpacing = Math.round(this.$refs.height.clientHeight); //每一行的高度

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
@import '../../assets/css/itv-theme.less';
@import 'itv-picker.less';
</style>

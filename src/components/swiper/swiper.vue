<template>
    <div class='itv-swpier' @resize="resize" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" @touchcancel="touchend" >
        <div class="itv-swpier-touch" @transitionend="aniamteend"   ref="box" :class="['itv-swpier-flex-'+direction, {'itv-swpier-animating':isAnimating, 'itv-move-anmiating':isMove===1} ]" >
            <div class="itv-swpier-item" v-if="number >=2 && loop === true" v-html="lastOne"></div>    
            <slot></slot>
            <div class="itv-swpier-item" v-if="number >=2 && loop === true" v-html="firstOne"></div>    
        </div> 
        <slot name="dot"></slot>
    </div>
</template>
<script>
import render  from  '../../libs/render'
import getDirection from '../../libs/touch'

import judge from './mixins/judge'

export default {
    mixins:[judge],
    props: {
        value: {
            type: Number,
            default: 0
        },
        //是否循环
        loop: {
            type: Boolean,
            default: false
        },
        //row为横向，column为纵向
        direction: {
            type: String,
            default: 'row'
        },
        bounce: {
            type: Boolean,
            default: true
        },
        /**
         * 向下或向右滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
         */
        beginBounce: {
            type: Boolean,
            default: false
        },

        /**
         * 向上或向左滑动是否弹，此属只在0-max,最大张数间有数，例如有1234这个属性只在23中有效
         */
        endBounce: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return  {
            isAnimating: false, //动画是否在进行中，
            touchstartTime:0, //touchstart开始的时间戳 
            startX: 0, //touchstart的开始接触点
            startY: 0, //touchstart的开始接触点
            moveX: 0, //touch记录上次手指接触点
            moveY: 0, //touch记录上次手指接触点
            isTouch: false, //手指是否接触了屏幕
            elSize:0, //元素的高或宽
            nowIndex: 0, //当有滚动的张数
            intialIncex:0, //初始化是第一张的索引
            intialLastIndex: 0, //初始化是后一张的索引
            coordinate: 0, //滑动值
            initialCoordinate: 0,//上一次的位置
            isMove: 0,// 0为初始状态，1允许滑动，2不允许滑动
            number: 0, //子元素张数
            moveMax:0, //滑动的最大值
            lastOne:'', //循环是复制后一张
            firstOne: '',//循环是复制第一张
            children: [],
            dom:'',
            winWidth: window.innerWidth
            
        }
    },
    watch: {
         winWidth() {
            this.$nextTick(()=>{
                 this.resize();
            })
           
        },
        value(n, old) {
            let coordinate = n*this.elSize;
            if(this.isLoop) {
                coordinate = ( n + 1)*this.elSize;
            }

            if(coordinate === this.coordinate) {
                return
            }
            this.scrollTo(n, true);
            
        }
    },
    computed: {
        oneSize() {
            
        }
    },
    methods: {
        aniamteend() {
          
            this.isAnimating = false;
            
            if(this.isLoop && this.nowIndex === 0) {
                this.coordinate = this.number*this.elSize
                this.nowIndex = this.number
                
            }

            if(this.isLoop && this.nowIndex > this.number) {
                this.coordinate = this.elSize
                this.nowIndex = 1;
                
            }

            if(this.isLoop) {
                this.$emit('change', this.nowIndex-1)
                this.$emit('input', this.nowIndex-1)
                this.setPostion()
                return
            }
           
            this.$emit('change', this.nowIndex)
            this.$emit('input', this.nowIndex)
            
           
        },
        touchstart(e) {
            
            //判断动画是否在进行中, 进行中禁止滑动
            if (this.isAnimating) return
            this.touchstartTime= new Date().getTime()
            let self = e.targetTouches
            this.$emit('touchstart')

            if (self.length <= 1) {
                this.startX = self[0].pageX
                this.startY = self[0].pageY
                this.moveX = this.startX
                this.moveY = this.startY
                this.isTouch = true
            }
        },
        touchmove(e) {
            if (!this.isTouch) {
                return false
            }
           
            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY
             
            let obj = getDirection(this.moveX, this.moveY, x, y, this.screenType)

            
            if(obj.type > 2 && this.isMove === 0) {
                this.screenType = 'progress'
                if(this.direction === 'row') {
                    this.isMove = 1
                }else{
                    this.isMove = 2
                }
            }

            if(obj.type >= 1 && obj.type <= 2 && this.isMove === 0) {
                this.screenType = 'vertical'
                this.isMove = true
                if(this.direction === 'column') {
                    this.isMove = 1
                }else{
                    this.isMove = 2
                }
            }

           
            if (this.isMove===1) {
                e.preventDefault()
                e.stopPropagation()
            }

            if (obj.type > 0 && this.isMove===1) {
                //   e.preventDefault();
                
                this.moveX = x
                this.moveY = y
            
                switch (this.screenType) {
                    case 'vertical':
                        if(this.isMoveMax(obj.angy)) {
                            let post = this.coordinate - obj.angy*0.4;
                            this.coordinate = post
                           
                        }else{
                            
                            if((this.beginBounce && obj.type === 2 && this.coordinate < this.nowPosition)||(this.endBounce && obj.type === 1 && this.coordinate > this.nowPosition)) {
                                this.coordinate -= obj.angy*0.4;
                            }else{
                                this.coordinate -= obj.angy;
                            }
                            
                        }
                        
                            

                        break
                    case 'progress':
                        
                      
                        if(this.isMoveMax(obj.angx)) {
                        
                            // this.coordinate -= obj.angx*0.4;
                             let post = this.coordinate - obj.angx*0.4;
                            this.coordinate = post
                        }else{
                           
                            // this.coordinate -= obj.angx;
                         
                            if((this.beginBounce && obj.type === 4 && this.coordinate < this.nowPosition)||(this.endBounce && obj.type === 3 && this.coordinate > this.nowPosition)) {
                                this.coordinate -= obj.angx*0.4;
                            }else{
                                this.coordinate -= obj.angx;
                            }
                        }   
                        break
                }

                if(!this.bounce) {
                    if(this.coordinate<=0) {
                        this.coordinate = 0;
                    }
                    if(this.coordinate >= this.moveMax) {
                        this.coordinate = this.moveMax;
                    }

                    if(this.coordinate > this.moveMax || this.coordinate<=0) {
                        
                    }
                }
                this.setPostion()
            }
        },
        touchend(e) {
            this.$emit('touchend')
           
            if (this.isMove===1) {
                e.preventDefault()
                e.stopPropagation()
            }

            this.isTouch = false
            this.isMove = 0
            let screenType = this.screenType
            this.screenType = ''
            let self = e.targetTouches
            if (screenType) {
                    e.preventDefault()
                    e.stopPropagation()
                    let now = new Date().getTime()
                    let dis = this.moveX - this.startX
                    if(this.direction === 'column') {
                        dis = this.moveY - this.startY
                    }
                    
                    
                    let isfast = Math.abs(dis) > 50 && now - this.touchstartTime < 300 //是否快速滑过
                    let isChangePos = Math.abs(this.coordinate)%this.elSize; //是否有移动
                   
                   if(isChangePos){
                       this.isAnimating = true
                   } 

                    //滑动到最小值
                    if(this.coordinate<=0) {
                        this.coordinate = 0;
                        this.nowIndex = 0
                        this.setPostion()
                        this.$emit('first')
                        console.log('---------------------first--------');
                        return
                    }
                       
                     //滑动到最大值
                    if(this.coordinate >= this.moveMax) {
                        this.coordinate = this.moveMax;
                        this.setPostion()
                        this.$emit('last') 
                        
                        return
                    }
                    //快速滑过
                        
                     
                    if((isfast && dis<-50) || this.isSpeedDir()==='next') {
                        if(!this.endBounce) {
                           this.nowIndex++;
                        }
                       
                       this.coordinate = this.nowIndex*this.elSize;
                       this.setPostion() 
                       return    
                    }

                    if((isfast && dis>50)||this.isSpeedDir()==='prev') {
                       if(!this.beginBounce) {
                           this.nowIndex--;
                       }
                       
                       this.coordinate = this.nowIndex*this.elSize
                       this.setPostion()     
                       return
                    }
                
                    this.coordinate = this.nowIndex * this.elSize;
                    this.setPostion()
            }
        },
        //设置父元素的高度
        setElHeight() {
            if(this.heightType ===  'auto' && this.direction === 'row') return
        },
        clone() {
            if(this.loop === false || this.$children.length <= 1) return
        },
        //设置box的高或宽
        setElSize() {
            if(this.direction==='row'){
                this.elSize =  this.$el.clientWidth;
                return
            }
            this.elSize =  this.$el.clientHeight;
        },
        //初始box的数量
        initNumber() {
            let number = 0;
            this.children = []
            this.$children.forEach(item=>{
                if(item.name === 'itv-swpier-item') {
                    number++
                    this.children.push(item)
                }
            })
            this.number = number
        },
        //计算
        calcMax() {
            if(this.number>=2 &&  this.loop) {
                this.moveMax = (this.number+1)*this.elSize
                return
            } 
            this.moveMax = (this.number-1)*this.elSize
        },
        //初始化位置，索引
        initCoordinate() {
            if(this.number>=2 &&  this.loop) {
                this.intialIndex = 1
                this.intialLastIndex = this.number
                this.nowIndex = this.value + 1
                this.coordinate = this.nowIndex*this.elSize
                this.setPostion()
                return
            } 
            this.intialIndex = 0
            this.nowIndex = this.value;
            this.coordinate = this.nowIndex*this.elSize
            this.setPostion()
            this.intialLastIndex = this.number-1;
            
        },
        clone() {
            if(this.number>=2 &&  this.loop) {
                this.firstOne = this.children[0].$el.innerHTML
                this.lastOne = this.children[this.children.length-1].$el.innerHTML 
                return
            } 
        }, 
        init() {
            this.dom = render(this.$refs.box)
            this.setElSize()
            this.setElHeight()
            this.initNumber()
            this.calcMax()
            this.initCoordinate();
            this.clone();
        },
        resize() {
            this.setElSize()
            this.calcMax();
            this.coordinate = this.nowIndex*this.elSize;
            this.setPostion();

        },
        setPostion() {
            if(this.direction === 'row'){
                this.dom(this.coordinate, 0 , 1)
                return
            }
            this.dom(0, this.coordinate, 1)
        },
        //滚动到第几张,带动画
        scrollTo(value, isAnimate) {
            if(value < 0 || value >= this.number) return
            this.isAnimating = !!isAnimate;
            if(this.isLoop) {
                this.nowIndex = value + 1
                this.coordinate = this.nowIndex*this.elSize;
                this.setPostion()
                this.$emit('input', value)
                this.$emit('change', value)
                return
            }
            this.nowIndex = value;
            this.coordinate = this.nowIndex*this.elSize;
            this.setPostion();
            this.$emit('input', value)
            this.$emit('change', value)
        }
    },
    
    mounted() {
        this.init()
         window.addEventListener('resize', ()=>{
            this.winWidth = window.innerWidth
        })

    }
}
</script>
<style lang="less" scoped>
@import './swiper.less';
</style>

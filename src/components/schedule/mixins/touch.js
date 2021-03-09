import render from '../../../libs/render'
import { slideHeight } from '../../../libs/tool'
import getDirection from '../../../libs/touch'
export default {
    data() {
        return {
            isTouch: false,
            startX: 0, //touchstart x
            startY: 0, //touchstart y
            moveX: 0,
            moveY: 0,
            move: 0,
            x: 0, //日历dom元素x位移
            y: 0, //日历dom元素的高度


            
            px: 0, //scroller位移动
            py: 0, //scroller位移动
            ptoX: 0, 
            ptoY: 0,
            pStepX: 0,
            pStepY: 0,


            //scroll值
            sx: 0, //scroll位移动
            sy: 0, //scroll位移动
            sMaxX: 0,
            sMaxY: 0,
            sCacheX: 0,//缓存位置
            sCacheY: 0, //缓存位置
            sStepX: 0, //动画滚动动画的当前滚动的速度
            sStepY: 0, //动画滚动动画的当前滚动的速度
            stopStep: 0.5, //当sStepX,sStepY绝对值小于0.5停止滚动
            scrollToX: null,
            scrollToY: null,



            cacheDir: '',//存储滑动方向   vertical竖向  prgress 横向
             //moveDir
             moveDir: 0, //滑动方向  1向上 2向下 3向左 4向右 0未滑动

            isMove: false,
            screenType: '',
            calendarX: 0,
            weekX: 0,
            endStatus: 1, //0为上周或上一周，1为显示周或显示月，2为下一周或下一月
            aniStatus: false, //否动画状态还没完成，如没完成时，滑动将无效化
            startTime: 0, //屏幕手指接触时间
            calendarStatus: this.toggleStatus, // 0, //0为星期滑动，1为月滑动
            isClickChange: false, //是否为点击切换上一个月,或下一个月
            dom:'',
            wdom: '',
            hdom: '',
            scrollDom:'',
            scrollerDom:'',
            touchMoveList:[], //移动存储的手指数
           
            //滑动区所处的位置
            movePosition: {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }

        }
    },

    mounted() {
        this.dom = render(this.$refs.slide)
        this.wdom = render(this.$refs.week)
        this.hdom = slideHeight(this.$refs.calendar)
        this.scrollerDom = render(this.$refs.scroller)
        this.scrollDom = render(this.$refs.scroll)
        // let ele = this.$refs.scroller.parentNode
       
        

    },
    watch: {
        /**
         * 
         */
        calendarStatus(n, o) {
            if(this.$refs.scroll && n === 0) {
                let dom = this.$refs.scroll;
                let parent = dom.parentNode;
                let ph = dom.clientHeight;
                this.sMaxY = ph - parent.clientHeight || 0;
                
            }
        }
    },
    
    methods: {
        
        touchstart(e) {
            if (this.isAni) return
            if (!this.isAni) {
                this.aniStatus = false
            }

            this.scrollToX = null;
            this.scrollToY = null;
            this.moveDir = 0;

            this.startTime = new Date().getTime()
            let touches = e.touches;
            //检查手指数量
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }

            // 两只手指滑动处理中心点
            
            let isSingleTouch = touches.length === 1;
            this.isAni = false
            if (isSingleTouch) { //如果只有只手指时
                this.moveX = touches[0].pageX;
                this.moveY = touches[0].pageY;
            } else {//如果只有两只手指时，取中点
                this.moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                this.moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }
            this.startX = this.moveX 
            this.startY = this.moveY
            this.isTouch = true

            //存储位置数
            this.touchMoveList.push({
                x: this.moveX,
                y: this.moveY,
                time: new Date().getTime()
            })
           
        },
        touchmove(e) {
            
            if (this.aniStatus) {
                e.preventDefault()
                e.stopPropagation()
                return
            }
            if (!this.isTouch) {
                return false
            }

            let touches = e.touches;
            if (touches.length == null) {
                throw new Error("Invalid touch list: " + touches);
            }
            
            // 两只手指滑动处理中心点
            let moveX, moveY
            let isSingleTouch = touches.length === 1;
            if (isSingleTouch) {
                moveX = touches[0].pageX;
                moveY = touches[0].pageY;
            } else {
                moveX = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
                moveY = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
            }

            let x = moveX
            let y = moveY
            
         
            this.touchMoveList.push({
                x: moveX,
                y: moveY,
                time: new Date().getTime()
            })

            //滑动到部，直接结束  可有可无
            // if(y < 70) {
            //     this.touchend(e);
            //     return
            // }


            let obj = this.getDirection(this.moveX, this.moveY, x, y, this.screenType)
            
            this.moveDir = obj.type;
            
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.isMove) {
                if (obj.type === 1 || obj.type === 2) {
                    this.screenType = 'vertical'
                    // this.y = this.slideHeight
                } else {
                    this.screenType = 'progress'
                }
                this.isMove = true
            }
            
            //判断是否已经有滑动了
            if (this.screenType) {
                e.preventDefault()
                e.stopPropagation()
            }



            if (obj.type > 0 && this.isMove) {
                //   e.preventDefault();
                this.moveX = x
                this.moveY = y
                let isMin = (this.calendarStatus===1?this.isCalendarMinMonth : this.isWeekMin) && this.x > -this.elWidth && obj.angx > 0;
                let isMax = (this.calendarStatus===1 ? this.isCalendarMaxMonth : this.isWeekMax )&&  this.x < -this.elWidth &&  obj.angx < 0;
                

                switch (this.screenType) {
                    case 'vertical':
                        
                     //下拉刷新
                     if(obj.type === 2 && this.y >= this.maxHeight && this.sy>=0 && this.bounceTop) {
                        this.py +=  Math.round(obj.angy*0.3)
                        this.scrollerDom(0, -this.py,1 )
                        this.$emit('pull',this.py)
                        return
                    }

                    if(obj.type === 1 && this.y >= this.maxHeight && this.py > 0 && this.bounceTop) {
                      
                        this.py +=  Math.round(obj.angy)
                        if(this.py<0) {
                            this.py = 0
                        }
                        this.$emit('pull',this.py)
                        this.scrollerDom(0, -this.py,1 )
                        return
                    }

                         //日历已经收起，并且向上滑动
                        if(obj.type === 1 && this.y <= this.rowHeight) {
                            
                            this.sy +=  Math.round(obj.angy);
                            if(this.sy <0 && Math.abs(this.sy) > this.sMaxY) {
                                this.sy = -this.sMaxY;
                            }
                            this.scrollDom(-this.sx, -this.sy, 1)
                          
                        }
                        //日历已经收起，并且向下滑动
                        if(obj.type === 2 && this.y <= this.rowHeight ) {
                            if(this.sy < 0) {
                                this.sy +=  Math.round(obj.angy)
                                if(this.sy >= 0 ) {
                                    this.sy = 0;
                                }
                                this.scrollDom(-this.sx, -this.sy, 1)
                            }
                        }

                       
                        
                        //当内容到顶部时
                        if(this.sy === 0 && this.py <=0) {
                            console.log('----------------');
                            this.verticalMoveCalendar(obj.angy)
                        }
                        
                        this.$emit('scroll', {
                            max: this.sMaxY,
                            scroll: this.sy
                        })

                        // this.verticalMoveCalendar(obj.angy)
                        break;
                    case 'progress':
                        if(isMin||isMax){
                            this.x += Math.round(obj.angx*0.3) 
                        }else{
                            this.x += Math.round(obj.angx)
                        }
                        if (this.calendarStatus === 0) {
                            this.wdom(-this.x, 0, 1)
                        } else {
                            this.dom(-this.x, 0, 1)
                        }
                        break
                }
            }
        },
        touchend(e) {
            if (this.aniStatus) {
                e.preventDefault()
                e.stopPropagation()
                return
            }

            //触发下拉刷新
            let pullHeight = this.pullDis || this.pullHeight 
            if(this.py >= pullHeight && !this.isRefresh) {
                this.isRefresh = true
                this.$emit('refresh')
            }
            this.isTouch = false
            this.isMove = false
            let screenType = this.screenType
            this.screenType = '';
            this.cacheDir = screenType;
            
            let now = new Date().getTime()
            let dis = screenType==='progress'?this.moveX - this.startX:this.moveY - this.startY
            let isfast = Math.abs(dis) > 20 && now - this.startTime < 200
            let x = this.x
            let y = this.y

           
            switch (screenType) {
                case 'vertical':
                    if(this.py > 0) {
                        if(this.py > pullHeight ) {
                            this.scrollerTo(0,pullHeight, 1)
                        }else{
                           
                            this.scrollerTo(0, 0, 1)
                        }
                        return
                    }
                    if (this.y <= this.rowHeight  ) {
                        this.slideHeight = this.rowHeight
                    }
                    if (this.y >= this.maxHeight) { //----
                        this.slideHeight = this.maxHeight
                    }

                    if(this.y > this.rowHeight && this.y < this.maxHeight) {
                        this.aniStatus = true;
                        if ((!isfast && this.y > this.rowHeight * 3) || (isfast && dis > 0 )) {
                            window.requestAnimationFrame(this.aniUnfold)
                            return
                        }
                        window.requestAnimationFrame(this.aniShrink)
                        return
                    }

                    
                    if(this.y <= this.rowHeight) {
                        let speed = this.calcMoveSpeed();
                        this.animate(speed)
                    }
                    
                   
                    break
                case 'progress':
                    e.preventDefault()
                    e.stopPropagation()
                    this.isAni = true
                    this.aniStatus = true
                     //是否快速滑过
                   
                    if ((isfast && dis > 0) || x >= -this.elWidth * (2 / 3)) {
                        
                        if (this.calendarStatus === 0 && !this.isWeekMin) {
                            this.x = 0
                            this.weekX = 0
                            this.endStatus = 0
                            return
                        }
                        
                        //日历
                        if(this.calendarStatus === 1 && !this.isCalendarMinMonth) {
                            this.x = 0
                            this.calendarX = 0
                            this.endStatus = 0
                            return
                        }
                        
                    }

                    if ((isfast && dis < 0) || x <= -this.elWidth - this.elWidth / 3) {
                       
                        if (this.calendarStatus === 0 && !this.isWeekMax) {
                            this.x = -this.elWidth * 2
                            this.weekX = -this.elWidth * 2
                            this.endStatus = 2
                            return
                        } 
                        if(this.calendarStatus === 1 &&  !this.isCalendarMaxMonth) {
                            this.calendarX = -this.elWidth * 2
                            this.x = -this.elWidth * 2
                            this.endStatus = 2
                            return
                        }
                        
                    }

                    this.$emit('bounce', {x:this.x, width:this.elWidth })
                    this.endStatus = 1
                    this.x = -this.elWidth
                    if (this.calendarStatus === 0) {
                        this.weekX = -this.elWidth;
                        this.wdom(this.elWidth, 0, 1)
                    } else {
                        this.calendarX = -this.elWidth
                        this.dom(this.elWidth, 0, 1)
                    }

                default:
                    
            }
          
            
            
           
        },
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy , show) {
            var angx = endx - startx
            var angy = endy - starty
            var result = 0
            //如果滑动距离太短
            if (Math.abs(angx) < 3 && Math.abs(angy) < 3  && !show) {
                return result
            }
            // //如果滑动距离太短
            // if (Math.abs(angx) < 1.5 && Math.abs(angy) < 1.5 && !show) {
            //     return result
            // }

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
        //获得角度

        getAngle(angx, angy) {
            return (Math.atan2(angy, angx) * 180) / Math.PI
        },
        //设置是否显示星期
        setShowTop() {
            let index = this.y / this.rowHeight
            let rows = Math.ceil(this.nowMonth.length/7)
            let row = rows - this.rows
            if (index <= row) {
                this.showTop = true
            } else {
                this.showTop = false
            }

            if (this.y <= this.rowHeight) {
                this.showTop = true
            }
            if (this.y >= this.maxHeight) {
                this.showTop = false
            }
        },
        //展开
        aniUnfold() {
            this.y += this.step
            if (this.y >= this.maxHeight) {
                this.aniStatus = false
                this.y = this.maxHeight
                this.hdom(this.y)
                this.showTop = false
                this.calendarStatus = 1
                this.slideHeight = this.maxHeight;
              
                this.setShowTop()
                return
            }

            this.hdom(this.y)
            this.setShowTop()
            window.requestAnimationFrame(this.aniUnfold)
        },
        //收缩
        aniShrink() {
            this.y -= this.step
            if (this.y <= this.rowHeight) {
                this.aniStatus = false
                this.y = this.rowHeight
                this.slideHeight = this.rowHeight
                this.calendarStatus = 0
                this.hdom(this.y)
               
                this.setShowTop()
                return
            }
            this.hdom(this.y)
            
            this.setShowTop()
            window.requestAnimationFrame(this.aniShrink)
        },
    },
}

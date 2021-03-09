import render from '../libs/render'
import { slideHeight } from '../libs/height'

var dom
var wdom
var hdom
export default {
    data() {
        return {
            isTouch: false,
            startX: 0, //touchstart x
            startY: 0, //touchstart y
            moveX: 0,
            moveY: 0,
            move: 0,
            end: 0,
            x: 0, //dom元素x位移
            y: 0, //dom元素的高度
            isMove: false,
            screenType: '',
            calendarX: 0,
            weekX: 0,
            endStatus: 1, //0为上周或上一周，1为显示周或显示月，2为下一周或下一月
            aniStatus: false, //否动画状态还没完成，如没完成时，滑动将无效化
            startTime: 0, //屏幕手指接触时间
            calendarStatus: 0, //0为星期滑动，1为月滑动
            isClickChange: false, //是否为点击切换上一个月,或下一个月
            dom:'',
            wdom: '',
            hdom: ''
        }
    },

    mounted() {
        this.dom = render(this.$refs.slide)
        this.wdom = render(this.$refs.week)
        this.hdom = slideHeight(this.$refs.calendar)
    },
    computed: {
        //计算当有是不是已经是最小月值
        isCalendarMinMonth() {
            if(this.min){
                let arr = this.min.split('/');
                arr[1] = parseInt(arr[1])
                let number = parseInt(arr[0]+''+arr[1]);   
                console.log(number,this.prevMonth[14].number);
                if(number > this.prevMonth[14].number) {
                    return true
                }   
            }
            
            return false;
        },
        isCalendarMaxMonth() {
            if(this.max){
                let arr = this.max.split('/');
                arr[1] = parseInt(arr[1])
                let number = parseInt(arr[0]+''+arr[1]);   
             
                if(number < this.nextMonth[14].number) {
                    return true
                }      
            }
            return false;
        },
        isWeekMin() {
            if(this.min) {
                
                let temp = new Date(this.min+'/1').getTime();
                if(this.prevWeek[6].time<temp){
                    return true
                }
            }
            return false;
        },
        isWeekMax() {
            if(this.max) {
                let arr = this.max.split('/');
                arr[1] = parseInt(arr[1])
                let number = parseInt(arr[0]+''+arr[1]);    
                if(this.nextWeek[0].number>number){
                    return true
                }
            }
       
            return false;
        }      
    },
    methods: {
       
        aniamteend() {
            this.isAni = false
            if (this.calendarStatus === 1) {
                this.getNowDate()
            }

            if (this.endStatus === 2) {
                if (this.calendarStatus === 0) {
                    this.prevWeek = this.nowWeek
                    this.nowWeek = this.nextWeek
                    this.currentValue = this.nowWeek[this.currentIndexWeek].time
                    this.selected(this.currentIndexWeek, this.nowWeek[this.currentIndexWeek])
                    let oneday = 3600 * 24 * 1000
                    let ntampTime = new Date(this.nowWeek[6].msg).getTime() + oneday
                    let nrevdate = new Date(ntampTime)
                    let _nyear = nrevdate.getFullYear() //获取年份
                    let _nmonth = nrevdate.getMonth() + 1
                    let _nday = nrevdate.getDate()
                    let _ndayWeek = nrevdate.getDay()
                    this.nextWeek = this.calcWeek(_nyear, _nmonth, _nday, _ndayWeek)
                } else {
                    this.prevMonth = this.nowMonth
                    this.nowMonth = this.nextMonth

                    //计算下一个月的数组
                    let _year = this.year
                    let _month = this.month
                    if (_month === 12) {
                        _month = 1
                        _year++
                    } else {
                        _month++
                    }
                    this.nextMonth = this.calcMonth(_year, _month)

                    if (this.isClickChange) {
                        let obj = this.findMonthIndex(this.currentValue)
                        this.selectDay(obj.index, obj.item)
                    }

                    if (!this.isClickChange) {
                        let time = this.calcNextSameDay()
                        let obj = this.findMonthIndex(time)
                        this.selectDay(obj.index, obj.item)
                    }

                    this.isClickChange = false
                }
            }

            if (this.endStatus === 0) {
                if (this.calendarStatus === 0) {
                    this.nextWeek = this.nowWeek
                    this.nowWeek = this.prevWeek
                    this.currentValue = this.nowWeek[this.currentIndexWeek].time
                    this.selected(this.currentIndexWeek, this.nowWeek[this.currentIndexWeek])
                    let oneday = 3600 * 24 * 1000
                    let ptampTime = new Date(this.nowWeek[0].msg).getTime() - oneday
                    let prevdate = new Date(ptampTime)
                    let _pyear = prevdate.getFullYear() //获取年份
                    let _pmonth = prevdate.getMonth() + 1
                    let _pday = prevdate.getDate()
                    let _pdayWeek = prevdate.getDay()
                    this.prevWeek = this.calcWeek(_pyear, _pmonth, _pday, _pdayWeek)
                } else {
                    this.nextMonth = this.nowMonth
                    this.nowMonth = this.prevMonth
                    //计算上一个月的数组
                    let _year = this.year
                    let _month = this.month

                    if (_month === 1) {
                        _month = 12
                        _year--
                    } else {
                        _month--
                    }
                    this.prevMonth = this.calcMonth(_year, _month)

                    if (this.isClickChange) {
                        let obj = this.findMonthIndex(this.currentValue)
                        this.selectDay(obj.index, obj.item)
                    }

                    if (!this.isClickChange) {
                        let time = this.calcPrevSameDay()
                        let obj = this.findMonthIndex(time)
                        this.selectDay(obj.index, obj.item)
                    }
                    this.isClickChange = false
                }
            }
            this.$nextTick(() => {
                this.x = -this.elWidth
                this.calendarX = -this.elWidth
                this.weekX = -this.elWidth
            })
        },
        touchstart(e) {
            if (this.isAni) return
            if (!this.isAni) {
                this.aniStatus = false
            }
            this.startTime = new Date().getTime()
            let self = e.targetTouches
            this.isAni = false
            if (self.length <= 1) {
                this.startX = self[0].pageX
                this.startY = self[0].pageY
                this.moveX = this.startX
                this.moveY = this.startY
                this.isTouch = true
            }
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

            let self = e.targetTouches
            let x = self[0].pageX
            let y = self[0].pageY

            let obj = this.getDirection(this.moveX, this.moveY, x, y)
            
          
            //判断是否滑动并判断滑动的类型
            if (obj.type > 0 && !this.isMove) {
                if (obj.type === 1 || obj.type === 2) {
                    this.screenType = 'vertical'
                    this.y = this.slideHeight
                } else {
                    this.screenType = 'progress'
                }
                this.isMove = true
            }

            if (this.screenType) {
                e.preventDefault()
                e.stopPropagation()
            }

            if (obj.type > 0 && this.isMove) {
                //   e.preventDefault();
                this.moveX = x
                this.moveY = y
                switch (this.screenType) {
                    case 'vertical':
                        this.y += Math.round(obj.angy)
                        if (this.y <= this.rowHeight) {
                            this.y = this.rowHeight
                            this.calendarStatus = 0
                        }
                        if (this.y >= this.elHeight) {
                            this.y = this.elHeight
                            this.calendarStatus = 1
                        }
                        
                        this.setShowTop()
                        this.hdom(this.y)
                        break
                    case 'progress':

                        let isMin = (this.isCalendarMinMonth || this.isWeekMin) && this.x > -this.elWidth && obj.angx > 0;
                        let isMax = (this.isCalendarMaxMonth || this.isWeekMax )&&  this.x < -this.elWidth &&  obj.angx < 0;

                        
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
            this.end++
            this.isTouch = false
            this.isMove = false
            let screenType = this.screenType
            this.screenType = ''
            
            let now = new Date().getTime()
            let dis = screenType==='progress'?this.moveX - this.startX:this.moveY - this.startY
            let isfast = Math.abs(dis) > 20 && now - this.startTime < 200
            let x = this.x
            let y = this.y
            switch (screenType) {
                case 'vertical':
                    if (this.y <= this.rowHeight  ) {
                        this.slideHeight = this.rowHeight
                        return
                    }
                    if (this.y >= this.elHeight) {
                        this.slideHeight = this.elHeight
                        return
                    }
                    this.aniStatus = true
                     
                    if ((!isfast && this.y > this.rowHeight * 3) || (isfast && dis > 0 )) {
                        window.requestAnimationFrame(this.aniUnfold)
                        return
                    }
                    window.requestAnimationFrame(this.aniShrink)
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



                    this.endStatus = 1
                    this.x = -this.elWidth
                    if (this.calendarStatus === 0) {
                        this.weekX = -this.elWidth
                        this.wdom(this.elWidth, 0, 1)
                    } else {
                        this.calendarX = -this.elWidth
                        this.dom(this.elWidth, 0, 1)
                    }

                default:
            }
        },
        //根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
        getDirection(startx, starty, endx, endy) {
            var angx = endx - startx
            var angy = endy - starty
            var result = 0
            //如果滑动距离太短
            if (Math.abs(angx) < 3 && Math.abs(angy) < 3) {
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
        //获得角度

        getAngle(angx, angy) {
            return (Math.atan2(angy, angx) * 180) / Math.PI
        },
        setShowTop() {
            let index = this.y / this.rowHeight
            let row = 6 - this.rows
            if (index <= row) {
                this.showTop = true
            } else {
                this.showTop = false
            }

            if (this.y <= this.rowHeight) {
                this.showTop = true
            }
            if (this.y >= this.elHeight) {
                this.showTop = false
            }
        },
        //展开
        aniUnfold() {
            this.y += this.step
            if (this.y >= this.elHeight) {
                this.aniStatus = false
                this.y = this.elHeight
                this.hdom(this.y)
                this.showTop = false
                this.calendarStatus = 1
                this.slideHeight = this.elHeight;
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

import { formatDate } from "../../../libs/tool";

export default {
    created() {},

    data() {
        return {
            monthDaysArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        }
    },
    watch: {
        nowWeek(){
            // this.setCalendarStatus()   
        },
        nowMonth(){
            // this.setCalendarStatus()   
        }

    },
    computed:{
        maxHeight() {
            return this.rowHeight * Math.ceil(this.nowMonth.length/7)
         },
         //计算当有是不是已经是最小月值
         isCalendarMinMonth() {
             if(this.min){
                 let arr = this.min.split('/');
                
                 let number = parseInt(arr[0]+''+arr[1]);   
                
                 
                 if(number > this.prevMonth[14].number) {
                     return true
                 }   
             }
             
             return false;
         },
          //计算当前是不是已经是最大月值
         isCalendarMaxMonth() {
             if(this.max){
                 let arr = this.max.split('/');
                 let number = parseInt(arr[0]+''+arr[1]);   
                 if(number < this.nextMonth[14].number) {
                     return true
                 }      
             }
             return false;
         },
         //计算当前是不是已经是最小星期值
         isWeekMin() {
             if(this.min) {
                 let arr = this.min.split('/');
                 let number = parseInt(arr[0]+''+arr[1]); 
                 if(this.prevWeek[6].number<number){
                     return true
                 }
             }
             return false;
         },
         //计算当前是不是已经是最大星期值
         isWeekMax() {
             if(this.max) {
                 let arr = this.max.split('/');
                
                 let number = parseInt(arr[0]+''+arr[1]);    
                 if(this.nextWeek[0].number>number){
                     return true
                 }
             }
        
             return false;
         },      
        maxMonthNumber() {
            if(this.max) {
                let arr = this.max.split('/');
                let number = parseInt(arr[0]+''+arr[1]);    
                return number
            }
            return 0
        },
        minMonthNumber() {
            if(this.min) {
                let arr = this.min.split('/');
                let number = parseInt(arr[0]+''+arr[1]);    
                return number
            }
            return 0
        },
        months() {
            let now = formatDate('',"Y/M");
            let arr = now.split('/');
            let nowMonth = parseInt(arr[1]);
            let up = '';
            let next = '';
           
            switch (nowMonth) {
                case 12:
                    up = arr[0]+''+11
                    next = parseInt(arr[0])+1+'01'
                    break;
                case 1:
                    up = parseInt(arr[0])-1 + '12'
                    next = parseInt(arr[0])-1+'02'
                    break;    
                default:
                    up = arr[0] +''+ (nowMonth-1 >=10?nowMonth-1:'0'+(nowMonth-1))
                    next = arr[0] +'' +(nowMonth+1 >=10?nowMonth+1:'0'+(nowMonth+1))
                    break;
            }
                
            return {
                up:parseInt(up),
                now:parseInt(arr[0]+arr[1]),
                next:parseInt(next),
            }
        }
    }, 
    methods: {
        /**
         * 计算当前日历数据对象是否在可选择的范围内
         * @param {Object} item  选中的日历数组数据 
         */
        isBetween(item) {
            
            if(this.maxMonthNumber && item.number > this.maxMonthNumber) {
                return false
            }
            if(this.minMonthNumber && item.number < this.minMonthNumber) {
                return false
            } 
            return true
        },
        //计算切换时，是否在范围内,并返回在范围内的星期接近的哪一天
        calcWeekCurrentBetween(item, index) {
            
            if(this.maxMonthNumber && item.number > this.maxMonthNumber) {
                for (let i = index; i >= 0; i--) {
                    if(this.nowWeek[i].number <= this.maxMonthNumber) {
                        return i
                    }
                   
                }
            }
            
            if(this.minMonthNumber && item.number < this.minMonthNumber) {
                for (let i = index; i <= 6; i++) {
                    console.log(this.nowWeek[i].number);
                    if(this.nowWeek[i].number >= this.minMonthNumber) {
                        return i
                    }
                  
                }
            } 
            return index;
        },
        //计算下个月是否存在同一天
        calcNextSameDay(value) {
            value = value || this.currentValue
            let date = new Date(value)
            let year = date.getFullYear() //获取年份
            let month = date.getMonth() + 1
            let day = date.getDate()

            if (month === 12) {
                return new Date(year + 1 + '/1/' + day).getTime()
            }

            let isLeapYear = year % 4 === 0 //是否为润年
            month++
            let days = this.monthDaysArr[month - 1]
            if (isLeapYear && month === 2) {
                days = 29
            }
            if (day >= days) {
                day = days
            }
            return new Date(year + '/' + month + '/' + day).getTime()
        },

        //计算上一个月是否存在同一天
        calcPrevSameDay(value) {
            value = value || this.currentValue
            let date = new Date(value)
            let year = date.getFullYear() //获取年份
            let month = date.getMonth() + 1
            let day = date.getDate()

            if (month === 1) {
                return new Date(year - 1 + '/12/' + day).getTime()
            }
          
            let isLeapYear = year % 4 === 0 //是否为润年
            month--
            let days = this.monthDaysArr[month - 1]
            if (isLeapYear && month === 2) {
                days = 29
            }

            if (day >= days) {
                day = days
            }

            return new Date(year + '/' + month + '/' + day).getTime()
        },
        /**
         * 查找当前值对应的当前日历索引
         * @param {*} value 
         */
        findMonthIndex(value) {
            value = value || this.currentValue
            value = formatDate(value,'YMD')
            let res = ''
            for (let i = 0, l = this.nowMonth.length; i < l; i++) {
                if (this.nowMonth[i].key === value) {
                    res = {
                        index: i,
                        item: this.nowMonth[i],
                    }
                    break
                }
            }
            return res
        },

        /**
         * 设置星期日历当月显示的索引
         * @param {Number} time 某一天的00:00:00的时间戳 
         */
        findWeekIndex(time) {
            for (let i = 0, l = this.nowWeek.length; i < l; i++) {
                if (this.nowWeek[i].time === time) {
                    this.currentIndexWeek = i
                    break
                }
            }
        },
        /**
         * 设置当前星期日历，当变成月历时处在月历的第几行
         * @param {time} time 
         */
        findWeekRow(time) {
          
            for (let i = 0, l = this.nowMonth.length; i < l; i++) {
                if (this.nowMonth[i].time === time) {
                    this.rows = parseInt(i / 7)
                    break
                }
            }
        },
        /**
         * 计算当前年月
         */
        getNowDate() {
            let month = this.month
            if (this.endStatus === 0) {
                this.month--
                if (month === 1) {
                    this.year--
                    this.month = 12
                }
            }

            if (this.endStatus === 2) {
                this.month++
                if (month === 12) {
                    this.year++
                    this.month = 1
                }
            }
        },
        /**
         *
         * @param {string,number} year 年
         * @param {string,number} month 月
         * @param {stirng,number} day 日
         * @param {string, number} dayWeek 星期几0-6
         */
        calcWeek(year, month, day, dayWeek) {
            let ondays = 3600 * 24 * 1000
            let nowTime = new Date(year + '/' + month + '/' + day).getTime() - dayWeek * ondays
            let arr = []
            for (let i = 0; i <= 6; i++) {
                let date = new Date(nowTime)
                let _year = date.getFullYear() //获取年份
                let _month = date.getMonth() + 1
                let _day = date.getDate()
                let _dayWeek = date.getDay()
                let item = {
                    day: _day,
                    week: _dayWeek,
                    year: _year,
                    month: _month,
                    number: parseInt(_year+''+(_month>=10?_month:'0'+_month)),
                    key:_year+''+(_month>=10?_month:'0'+_month)+''+(_day>=10?_day:'0'+_day),
                    msg: _year + '/' + _month + '/' + _day,
                    time: new Date(_year + '/' + _month + '/' + _day).getTime(),
                    id: this.getId(),
                    overtop: false,
                    type: 'week',
                }
                item.overtop = this.isBetween(item)
                arr.push(item)
                nowTime = nowTime + ondays
            }
            return arr
        },
        getId() {
            let a = Math.random() * 1000000000
            let b = Math.random() * 100000000
            let c = Math.random() * 100000000
            return parseInt(a + b + c)
        },
        /**
         * 生成当前月分数组
         * @param {String,Number} year 年 
         * @param {String,Number} month 月
         */    
        calcMonth(year, month) {
            let date = new Date(`${year}/${month}/1`) //获取1号的Date
            let isLeapYear = year % 4 === 0 //是否为润年
            let days = this.monthDaysArr[month - 1]
            let dayWeek = date.getDay()
            if (isLeapYear && month === 2) {
                days = 29
            }
            let prev = this.calcPrevMonth(year, month, dayWeek)
            let now = []
            for (let i = 1; i <= days; i++) {
                let item = {
                    day: i,
                    week: dayWeek,
                    year: year,
                    month: month,
                    number:parseInt(year+''+(month>=10?month:'0'+month)),
                    msg: year + '/' + month + '/' + i,
                    key:year+''+(month>=10?month:'0'+month)+''+(i>=10?i:'0'+i),
                    time: new Date(year + '/' + month + '/' + i).getTime(),
                    id: this.getId(),
                    type: 'now',
                    overtop: false,
                };
                item.overtop = this.isBetween(item)
                now.push(item)
                dayWeek = this.calcNextWeek(dayWeek)
            }
            prev = prev.concat(now)

            let newday = prev[prev.length - 1]

            let last = this.calcNextMonth(newday.year, newday.month, newday.week, 42 - prev.length)
            return prev.concat(last)
        },
        
        /**
         * 计算下一天星期几
         * @param {Number} next 0~6
         */
        calcNextWeek(next) {
            if (next === 6) return 0
            return next + 1
        },

        
        /**
         * 计算上个月填充当月
         * @param {String,Number} year 当前年
         * @param {String,Number}  month 当前月份
         * @param {Number}  dayWeek 当前日期的星期几0~6
         */
        calcPrevMonth(year, month, dayWeek) {
            let _year = year
            let _month = month - 1
            if (dayWeek === 0) {
                //如果是星期日直接返回空数组
                return []
            }
            //如果是一月份上一个月是上一年12月份
            if (month === 1) {
                _year = year - 1
                _month = 12
            }
            let isLeapYear = _year % 4 === 0 //是否为润年
            let lastDay = this.monthDaysArr[_month - 1]
            //如果是润年的2月分为29天
            if (isLeapYear && month === 2) {
                lastDay = 29
            }
            let arr = []
            for (let i = dayWeek - 1; i >= 0; i--) {
                let item = {
                    week: i,
                    year: _year,
                    month: _month,
                    day: lastDay,
                    number:parseInt(_year+''+(_month>=10?_month:'0'+_month)),
                    key:_year+''+(_month>=10?_month:'0'+_month)+''+(lastDay>=10?lastDay:'0'+i),
                    msg: _year + '/' + _month + '/' + lastDay,
                    id: this.getId(),
                    time: new Date(_year + '/' + _month + '/' + lastDay).getTime(),
                    type: 'prev',
                    overtop:false
                }
                item.overtop = this.isBetween(item)
                arr.unshift(item)
                
                lastDay--
            }
            return arr
        },
        //计算下个月填充所有内容 将行数填充为6行
        calcNextMonth(year, month, dayWeek, num) {
            
            if (num === 0 || this.isKeepRows===false) return []
            let _year = year
            let _month = month + 1
            let _dayWeek = this.calcNextWeek(dayWeek)
            let arr = []
            if (month === 12) {
                //如果是星期日直接返回空数组
                _month = 1
                _year = year + 1
            }
            for (let i = 1; i <= num; i++) {
                let item = {
                    day: i,
                    week: _dayWeek,
                    year: _year,
                    month: _month,
                    number:parseInt(_year+''+(_month>=10?_month:'0'+_month)),
                    msg: _year + '/' + _month + '/' + i,
                    time: new Date(_year + '/' + _month + '/' + i).getTime(),
                    id: this.getId(),
                    type: 'next',
                    overtop:false
                }
                item.overtop = this.isBetween(item)
                arr.push(item)
                _dayWeek = this.calcNextWeek(_dayWeek)
            }
            return arr
        },
        aniamteend() {
            this.isAni = false
            if (this.calendarStatus === 1) {
                this.getNowDate()
            }
           
            if (this.endStatus === 2) {
                if (this.calendarStatus === 0) {
                    this.prevWeek = this.nowWeek
                    this.nowWeek = this.nextWeek

                    this.currentIndexWeek = this.calcWeekCurrentBetween(this.nowWeek[this.currentIndexWeek], this.currentIndexWeek);
                        
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
                    this.slideHeight = this.maxHeight;
                    this.y = this.maxHeight;
                }
            }

            if (this.endStatus === 0) {
                if (this.calendarStatus === 0) {
                    this.nextWeek = this.nowWeek
                    this.nowWeek = this.prevWeek
                    this.currentIndexWeek = this.calcWeekCurrentBetween(this.nowWeek[this.currentIndexWeek], this.currentIndexWeek);
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
                    this.slideHeight = this.maxHeight;
                    this.y = this.maxHeight;
                }
            }
            
            this.$nextTick(() => {
                this.x = -this.elWidth
                this.calendarX = -this.elWidth
                this.weekX = -this.elWidth
            })
        }
    },
}

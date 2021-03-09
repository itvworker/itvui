

export default {
    created() {},

    data() {
        return {
            monthDaysArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            
        }
    },
    computed:{
        maxMonthNumber() {
            if(this.max) {
                let arr = this.max.split('/');
                arr[1] = parseInt(arr[1])
                let number = parseInt(arr[0]+''+arr[1]);    
                return number
            }
            return 0
        },
        minMonthNumber() {
            if(this.min) {
                let arr = this.min.split('/');
                arr[1] = parseInt(arr[1])
                let number = parseInt(arr[0]+''+arr[1]);    
                return number
            }
            return 0
        },
    }, 
    methods: {
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
        findMonthIndex(value) {
            value = value || this.currentValue
            for (let i = 0, l = this.nowMonth.length; i < l; i++) {
                if (this.nowMonth[i].time === value) {
                    return {
                        index: i,
                        item: this.nowMonth[i],
                    }
                }
            }
        },

        //查找索引
        findWeekIndex(time) {
          
            for (let i = 0, l = this.nowWeek.length; i < l; i++) {
                if (this.nowWeek[i].time === time) {
                    this.currentIndexWeek = i
                    break
                }
            }
        },

        findWeekRow(time) {
          
            for (let i = 0, l = this.nowMonth.length; i < l; i++) {
                if (this.nowMonth[i].time === time) {
                    this.rows = parseInt(i / 7)
                    break
                }
            }
        },

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
         * @param {number} year 年
         * @param {number} month 月
         * @param {number} day 日
         * @param {number} dayWeek 星期几0-6
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
                arr.push({
                    day: _day,
                    week: _dayWeek,
                    year: _year,
                    month: _month,
                    number: parseInt(_year+''+_month),
                    msg: _year + '/' + _month + '/' + _day,
                    time: new Date(_year + '/' + _month + '/' + _day).getTime(),
                    id: this.getId(),
                    type: 'week',
                })
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
                now.push({
                    day: i,
                    week: dayWeek,
                    year: year,
                    month: month,
                    number:parseInt(year+''+month),
                    msg: year + '/' + month + '/' + i,
                    time: new Date(year + '/' + month + '/' + i).getTime(),
                    id: this.getId(),
                    type: 'now',
                })
                dayWeek = this.calcNextWeek(dayWeek)
            }
            prev = prev.concat(now)

            let newday = prev[prev.length - 1]

            let last = this.calcNextMonth(newday.year, newday.month, newday.week, 42 - prev.length)
            return prev.concat(last)
        },
        //计算下一天星期几
        calcNextWeek(next) {
            if (next === 6) return 0
            return next + 1
        },

        //计算上个月填充所有内容
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
                arr.unshift({
                    week: i,
                    year: _year,
                    month: _month,
                    day: lastDay,
                    number:parseInt(_year+''+_month),
                    msg: _year + '/' + _month + '/' + lastDay,
                    id: this.getId(),
                    time: new Date(_year + '/' + _month + '/' + lastDay).getTime(),
                    type: 'prev',
                })
                lastDay--
            }
            return arr
        },
        //计算下个月填充所有内容
        calcNextMonth(year, month, dayWeek, num) {
            if (num === 0) return []
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
                arr.push({
                    day: i,
                    week: _dayWeek,
                    year: _year,
                    month: _month,
                    number:parseInt(_year+''+_month),
                    msg: _year + '/' + _month + '/' + i,
                    time: new Date(_year + '/' + _month + '/' + i).getTime(),
                    id: this.getId(),
                    type: 'next',
                })
                _dayWeek = this.calcNextWeek(_dayWeek)
            }
            return arr
        },
    },
}

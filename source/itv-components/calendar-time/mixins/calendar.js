import { parse } from "qs";


export default {
    created() {},

    data() {
        return {
            prevMonth:[],
            nowMonth:[],
            nextMonth:[],
            monthDaysArr: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            currentDate:''
        }
    },
    computed:{
        currentDateNumber() {
            return parseInt(this.currentDate.replace(/-/ig,''))
        },
        currentDateInt() {
            return 
        },
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
        /**
         * 计算最大年月数字
         */
        calcMaxDate() {
            let arr = this.maxDate.split(' ');
            let num = arr[0].replace('-', '');
            num = num.split('-')
            return parseInt(num)
        },
        /**
         * 计算最小年月数字
         */
        calcMinDate() {
            let arr = this.minDate.split(' ');
            let num = arr[0].replace('-', '');
            num = num.split('-')
           
            return parseInt(num[0])
        },
        /**
         * 计算最大年月数字
         */
        calcMaxYmd() {
            let arr = this.maxDate.split(' ');
            let num = arr[0].replace(/-/ig, '');
            return parseInt(num)
        },
        /**
         * 计算最小年月数字
         */
        calcMinYmd() {
            let arr = this.minDate.split(' ');
            let num = arr[0].replace(/-/ig, '');
            return parseInt(num)
        },
        /**
         * 是否到了最小月份
         */
        beginBounce(){
            let date = this.currentValue.split('-');
            let num = parseInt(date[0]+''+date[1])
           
            if(num <= this.calcMinDate)  return true
            return false
        },
        /**
         * 是否到了最小月份
         */
        endBounce(){
            let date = this.currentValue.split('-');
            let num = parseInt(date[0]+''+date[1])
            if(num >= this.calcMaxDate) return true
            return false
        }
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
            
            
            let datenum = parseInt(year + '' + this.gt(month) + '' + this.gt(day));
            let datenumber = datenum;
            
            if(datenum < this.calcMinYmd) {
                datenumber = this.calcMinYmd
            }

            if(datenum > this.calcMaxYmd) {
                datenumber = this.calcMaxYmd
            }
            return datenumber;  
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
           
            let datenum = parseInt(year + '' + this.gt(month) + '' + this.gt(day));
            let datenumber = datenum;
            
            if(datenum < this.calcMinYmd) {
                datenumber = this.calcMinYmd
            }

            if(datenum > this.calcMaxYmd) {
                datenumber = this.calcMaxYmd
            }
            return datenumber;     
        },
        findMonthIndex(value) {
            value = value || this.currentValue
            
            for (let i = 0, l = this.nowMonth.length; i < l; i++) {
                if (this.nowMonth[i].time === value || this.nowMonth[i].ymdnumber === value) {
                    return {
                        index: i,
                        item: this.nowMonth[i],
                    }
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
                    number:parseInt(year+''+this.gt(month)),
                    msg: year + '-' + this.gt(month) + '-' + this.gt(i),
                    ymdnumber:parseInt(year + '' + this.gt(month) + '' + this.gt(i)),
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
            // return prev
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
                    number:parseInt(_year+''+this.gt(_month)),
                    msg: _year + '-' + this.gt(_month) + '-' + this.gt(lastDay),
                    ymdnumber:parseInt(_year + '' + this.gt(_month) + '' + this.gt(lastDay)),
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
            if (num === 0 ) return []
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
                    number:parseInt(_year+''+this.gt(_month)),
                    msg: _year + '-' + this.gt(_month) + '-' + this.gt(i),
                    ymdnumber:parseInt( _year + '' + this.gt(_month) + '' + this.gt(i)),
                    time: new Date(_year + '/' + _month + '/' + i).getTime(),
                    id: this.getId(),
                    type: 'next',
                })
                _dayWeek = this.calcNextWeek(_dayWeek)
            }
            return arr
        },
        /**
         * 将0到9转换成09
         * @param {Number} value
         */
        gt(value) {
          value = parseInt(value)
          return value>=10?value:0+''+value
        }
    },
    filters: {
        formatDate(arg, format) {
            // console.log(typeof arg.toString());
            let now
            if (!arg) {
                now = new Date()
            } else {
                now = new Date(arg)
            }
        
            format = format || 'Y/M/D h:m'
            const year = now.getFullYear()
            let month = now.getMonth() + 1
            month = month >= 10 ? month : '0' + month
            let date = now.getDate()
            date = date >= 10 ? date : '0' + date
            let hour = now.getHours()
            hour = hour >= 10 ? hour : '0' + hour
            let minute = now.getMinutes()
        
            minute = minute >= 10 ? minute : '0' + minute
            let second = now.getSeconds()
            second = second >= 10 ? second : '0' + second
            return format
                .replace('Y', year)
                .replace('M', month)
                .replace('D', date)
                .replace('h', hour)
                .replace('m', minute)
                .replace('s', second)
        }
    }
}

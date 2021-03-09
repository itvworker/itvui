export default {
    created() {
        
    },
    computed: {
        tempMonth() { //
            var month = []
            for(let i =1; i <= 31; i++ ){
                month.push[{
                    day: i
                }]
            }
            return month;
        }
    },
    data() {
        return {
            monthDaysArr:[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
            
        }
    },
    methods: {
        getNowDate() {
            let month = this.month;
            if(this.endStatus === 0) {
                this.month-- 
                if(month===1) {
                    this.year--
                    this.month =12
                }
            }    

            if(this.endStatus === 2) {
                this.month++ 
                if(month===12) {
                    this.year++
                    this.month =1
                }
            } 

        },
        getId() {
            let a = Math.random()*1000000000;
            let b = Math.random()*100000000;
            let c = Math.random()*100000000;
            return parseInt(a+b+c)
            
        },
        calcMonth(year,month) {
            let date = new Date(`${year}/${month}/1`); //获取1号的Date
            let isLeapYear = year%4===0;//是否为润年
            let days = this.monthDaysArr[month-1]
            let dayWeek = date.getDay();
            if(isLeapYear&& month===2) {
                days = 29; 
            }
            let prev = this.calcPrevMonth(year, month, dayWeek)
            let now = []
            for(let i = 1; i <= days; i++) {
                now.push({
                    day: i,
                    week: dayWeek,
                    year: year,
                    month: month,
                    id: this.getId(),
                    type: 'now'
                })
                dayWeek = this.calcNextWeek(dayWeek);
               
            }
            prev = prev.concat(now)
            let last = this.calcNextMonth(year,month,dayWeek,42-prev.length)
            return prev.concat(last)
        },
        //计算下一天星期几
        calcNextWeek(next) {
            if(next===6) return 0
            return next+1
        },
      
        //计算上个月填充所有内容
        calcPrevMonth(year, month, dayWeek){
          
            let _year = year
            let _month = month-1
            if(dayWeek===0) { //如果是星期日直接返回空数组
                return[]
            }
            //如果是一月份上一个月是上一年12月份
            if(month===1) {
                _year = year - 1;
                _month = 12; 
            }
            let isLeapYear = _year%4===0;//是否为润年
            let lastDay = this.monthDaysArr[_month-1];
            //如果是润年的2月分为29天
            if(isLeapYear&& month===2) {
                lastDay = 29;
            }
            let arr = []
            for(let i = dayWeek-1; i >= 0; i--){
                arr.unshift({
                    week: i,
                    year: _year,
                    month: _month,
                    day: lastDay,
                    id: this.getId(),
                    type: 'prev'
                })
                lastDay--
            }
            return arr;


            

            
        },
        //计算下个月填充所有内容
        calcNextMonth(year, month, dayWeek, num){
            if(num===0) return []
            let _year = year
            let _month = month;
            let _dayWeek = this.calcNextWeek(dayWeek)
            let arr = []
            if(month===12) { //如果是星期日直接返回空数组
                _month =1
                _year = year-1
            }
            for(let i = 1; i <= num; i++) {
                arr.push({
                    day: i,
                    week: _dayWeek,
                    year: _year,
                    month: _month,
                    id: this.getId(),
                    type: 'next'
                })
                _dayWeek = this.calcNextWeek(_dayWeek)
            }
            return arr
        }

    }
}
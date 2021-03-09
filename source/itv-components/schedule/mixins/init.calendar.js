export default {
    created() {
       this.init(this.currentValue)
    },
    mounted() {
        this.resize();
    },
    methods: {

        //设计大小
        resize() {
            this.elWidth = this.$el.clientWidth;
            this.screenWidth = document.body.clientWidth;
            this.calendarX = -this.elWidth
            this.weekX = -this.elWidth
            this.x = -this.elWidth
            
        },
        /**
         * 初始化日期数据
         * @param {String} value  年月日字符串
         */
        init(value) {
            let date = new Date(value)
            let year = date.getFullYear(); //获取年份
            let month = date.getMonth()+1
            let day = date.getDate()
            let dayWeek = date.getDay()
            let temp = date.getTime();
            this.year = year;
            this.month = month
            this.calcInit(year, month);
            this.initWeek(year, month, day, dayWeek);
            
            this.$nextTick(()=>{
                this.findWeekIndex(temp);
                this.findWeekRow(temp);
                this.elHeight = this.$refs.day[0].clientHeight*6;
                this.rowHeight =  this.elHeight /6;
                if(this.initState==='week') {
                    this.calendarStatus = 0;
                }
                if(this.calendarStatus===1) {
                    this.slideHeight = this.maxHeight;
                }else{
                    this.slideHeight = this.rowHeight;
                }
                this.y = this.slideHeight;
                this.currentValue = temp;
                this.step = parseInt(this.rowHeight*5/20)
                this.setShowTop()
            })
        },
        /**
         * 计算当前值的当前星期，上一星，下一星期的日历数数据
         * @param {String,Number} year 年
         * @param {String,Number}  month 月
         * @param {String,Number}  day 日 
         * @param {String,Number}  dayWeek 星期几
         */
        initWeek(year, month, day, dayWeek) {
            this.nowWeek = this.calcWeek(year, month, day, dayWeek);
            let oneday = 3600 * 24 *1000;
            //上一星期的计算
            let ptampTime = new Date(this.nowWeek[0].msg).getTime() - oneday;
            let prevdate = new Date(ptampTime);
            let _pyear = prevdate.getFullYear(); //获取年份
            let _pmonth = prevdate.getMonth()+1
            let _pday = prevdate.getDate()
            let _pdayWeek = prevdate.getDay();
            this.prevWeek = this.calcWeek(_pyear, _pmonth, _pday, _pdayWeek)
            
            //下个星期的计算   
            let ntampTime = new Date(this.nowWeek[6].msg).getTime() + oneday;
            let nrevdate = new Date(ntampTime);
            let _nyear = nrevdate.getFullYear(); //获取年份
            let _nmonth = nrevdate.getMonth()+1
            let _nday = nrevdate.getDate()
            let _ndayWeek = nrevdate.getDay();
            this.nextWeek = this.calcWeek(_nyear, _nmonth, _nday, _ndayWeek)
            
        },
        /**
         * 生成当前，上月， 下月的日历数组 
         * @param {*} year 
         * @param {*} month 
         */
        calcInit(year, month) {
            this.nowMonth = this.calcMonth(year, month);
           
            switch (month) {
                case 1:
                    this.prevMonth =  this.calcMonth(year-1, 12)
                    this.nextMonth =  this.calcMonth(year, month + 1)
                    break;
                case 12:
                    this.prevMonth =  this.calcMonth(year, month-1)
                    this.nextMonth =  this.calcMonth(year+1,  1)
                    break;
                default:
                    this.prevMonth =  this.calcMonth(year, month-1)
                    this.nextMonth =  this.calcMonth(year, month+1)
                    break;    
            }
            
        }
    }
}
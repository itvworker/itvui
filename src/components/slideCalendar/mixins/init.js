export default {
    created() {
       this.init(this.currentValue)
    },
    mounted() {
        
        this.resize();
        
    },
    methods: {
        resize() {
            this.elWidth = this.$el.clientWidth;
            this.screenWidth = document.body.clientWidth;
            this.calendarX = -this.elWidth
            this.weekX = -this.elWidth
            this.x = -this.elWidth
            
        },
        init(value) {
            let date = new Date(value)
            let year = date.getFullYear(); //获取年份
            let month = date.getMonth()+1
            let day = date.getDate()
            let dayWeek = date.getDay()
            this.year = year;
            this.month = month
            this.calcInit(year, month);
            this.initWeek(year, month, day, dayWeek);
            this.$nextTick(()=>{
                this.findWeekIndex(value);
                this.findWeekRow(value)
                this.elHeight = this.$refs.slide.clientHeight;
                this.rowHeight =  this.elHeight /6
                this.slideHeight = this.rowHeight;
                this.currentValue = value;
                this.step = parseInt(this.rowHeight*5/20)
                
            })
        },

    
        
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
            
               
            let ntampTime = new Date(this.nowWeek[6].msg).getTime() + oneday;
            let nrevdate = new Date(ntampTime);
            let _nyear = nrevdate.getFullYear(); //获取年份
            let _nmonth = nrevdate.getMonth()+1
            let _nday = nrevdate.getDate()
            let _ndayWeek = nrevdate.getDay();
            this.nextWeek = this.calcWeek(_nyear, _nmonth, _nday, _ndayWeek)
            
        },
        
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
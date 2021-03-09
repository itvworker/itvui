export default {
    
    mounted() {
        this.init()
        this.resize();
        
    },
    
    methods: {
        resize() {
            this.elWidth = this.$el.clientWidth;
            this.screenWidth = document.body.clientWidth;
            this.calendarX = -this.elWidth
            this.weekX = -this.elWidth
            this.x = -this.elWidth
            this.$refs.swiper.init();
            if(this.dateType==='calendar-time') {
                this.dataType = 0;
            }
        },
        init(value) {
            let datetime = value || this.value    
            let arr = datetime.split(' ');
            let timeArr = arr[1].split(':')
            let ymd = arr[0].split('-');     
            let year = parseInt(ymd[0]); //获取年份
            let month = parseInt(ymd[1])
            this.year = year;
            this.month = month
            this.calcInit(year, month);
            this.currentValue = arr[0];
            this.currentHour = timeArr[0];
            this.currentMin = timeArr[1]
            let ymdnumber = parseInt(year + this.gt(month))
            
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
export default {
    methods: {
        toggleCalendar() {
            if(this.calendarStatus===1) {
                this.aniShrink()
                return
            }
            this.aniUnfold()
            
        },
        selected(index, item) {
            if(!this.isBetween(item)) {
                return
            }
            this.currentValue = item.time;
            this.$emit("selected", item);
            this.calcInit(item.year, item.month);
            this.year = item.year;
            this.month = item.month;
            this.currentIndexWeek = index;
            this.findWeekRow(item.time);
        },

        /**
         * 点击选择内容
         */
        selectDay(index, item) {
            if(item.type!=='now' && this.isClickNowMonth) return;
           
            if(!this.isBetween(item)) {
                return
            }
            
            
            switch (item.type) {
                case "prev":
                    this.isClickChange = true;
                    this.isAni = true;
                    this.aniStatus = true;
                    this.calendarX = 0;
                    this.endStatus = 0;
                    this.currentValue = item.time;
                    break;
                case "next":
                    this.isClickChange = true;
                    this.isAni = true;
                    this.aniStatus = true;
                    this.calendarX = -2 * this.elWidth;
                    this.endStatus = 2;
                    this.currentValue = item.time;
                    break;
                default:
                    this.currentValue = item.time;
                    this.$emit("selected", item);
                    this.initWeek(item.year, item.month, item.day, item.week);
                    this.year = item.year;
                    this.month = item.month;
                    this.rows = parseInt(index / 7);
                    this.findWeekIndex(item.time);
                    break;
            }
        }
    }
}
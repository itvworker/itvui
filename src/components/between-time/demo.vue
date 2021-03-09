<template>
    <itv-container>
        <itv-header>Between-time</itv-header>

        <itv-main>
            
            <itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
                <div class="itv-between-time">
                    <div class="itv-between-time-top">
                        <div class="date">{{currentValue | formatDate('Y-M-D')}}</div>
                        <div class="time">6:12~12:22</div>
                        <div class="btn-confirm">{{confirmText}}</div>
                    </div>
                    <div class="week-bar">
                        <div class="week-item" v-for="(item, index ) in weekText" :key="index">{{item}}</div>
                    </div>
                    <div class="itv-between-time-change">
                        <swiper ref="swiper"  direction="column" @change="change" :loop="false" v-model="columnIndex" class="itv-swpier-between-time">
                            <swiper-item class="itv-swpier-calendar">
                            <div
                                    class="day-item"
                                    @click="selectDay(index, item)"
                                    :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    v-for="(item, index) in prevMonth"
                                    :key="item.id"
                                >
                                    <div class="active">{{item.day===1? item.month+'月':item.day}}</div>
                                </div>
                            </swiper-item>
                            <swiper-item class="itv-swpier-calendar">
                                <div
                                    class="day-item"
                                    @click="selectDay(index, item)"
                                    :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    v-for="(item, index) in nowMonth"
                                    :key="item.id"
                                    key-index="0"
                                    @chooseItem="chooseItem"
                                >
                                    <div class="active">{{item.day===1? item.month+'月':item.day}}</div>
                                </div>
                            </swiper-item>
                            <swiper-item class="itv-swpier-calendar">
                                <div
                                    class="day-item"
                                    @click="selectDay(index, item)"
                                    :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                                    v-for="(item, index) in nextMonth"
                                    :key="item.id"
                                >
                                    <div class="active">
                                        {{item.day===1? item.month+'月':item.day}}
                                    </div>
                                </div>
                            </swiper-item>
                        </swiper>
                        <div class="itv-picker-slot-box">
                                <picker-slot ref="picker-0"
                                    :default-value="startHour"
                                    :is-update="true"
                                    :list-data="startHourData"
                                    @chooseItem="chooseItem"
                                    :key-index="0"

                                ></picker-slot>

                              <div class="itv-picker-list itv-picker-list-mark ">
                                     <div class="itv-picker-indicator itv-picker-mark">
                                        ：
                                    </div>
                                </div>

                                <picker-slot 
                                    ref="picker-1"
                                    :default-value="startMinute"
                                    :is-update="false"
                                    :list-data="startMinutesData"
                                    @chooseItem="chooseItem"
                                    :key-index="1"
                                ></picker-slot>

                                <div class="itv-picker-list itv-picker-list-mark ">
                                     <div class="itv-picker-indicator itv-picker-mark">
                                        ~
                                    </div>
                                </div>

                                <picker-slot ref="picker-2"
                                    :default-value="endHour"
                                    :is-update="false"
                                    :list-data="endHourData"
                                    @chooseItem="chooseItem"
                                    :key-index="2"
                                ></picker-slot>

                              <div class="itv-picker-list itv-picker-list-mark ">
                                     <div class="itv-picker-indicator itv-picker-mark">
                                        ：
                                    </div>
                                </div>

                                <picker-slot 
                                    ref="picker-3"
                                    :default-value="endMinute"
                                    :is-update="false"
                                    :list-data="endMinutesData"
                                    @chooseItem="chooseItem"
                                    :key-index="3"
                                ></picker-slot>
                            </div>
                    </div>
                    
                    
                </div>       
            </itv-dialog>
        </itv-main>
    </itv-container>
</template>



<script>
    import swiper from '../swiper/swiper'
    import swiperItem from '../swiper-item/swiper-item.vue'
    import pickerSlot from '../picker/picker-slot.vue'
    import ItvDialog from '../dialog/dialog'
    import calendar from './mixins/calendar'
    import init from './mixins/init'
    import time from './mixins/time'
    export default {
        name: 'drawer',
        mixins:[calendar, init, time],
        components: {
            swiper,
            swiperItem,
            pickerSlot,
            ItvDialog
        },
        props: {
            value: {
                type: String,
                default: '2028-08-26 11:12 ~ 12:22'
            },
            weekText: {
                type: Array,
                default: () => ["日", "一", "二", "三", "四", "五", "六"]
            },
            confirmText: {
                type: String,
                default: "确定"
            }
        },
        data() {
            return {
               isVisible: true,
               hideOnClick: false,
               columnIndex:1,
               currentValue: this.value,
               year:0,
               month:0,
              
            }
        },
        methods: {
           change(index) {
               if(index===0) {
                    this.nextMonth = this.nowMonth
                    this.nowMonth = this.prevMonth
                    let _year = this.nowMonth[15].year
                    let _month = this.nowMonth[15].month
                    this.year = _year;
                    this.month = _month;
                   
                    if (_month === 1) {
                        _month = 12
                        _year--
                    } else {
                        _month--
                    }
                    this.prevMonth = this.calcMonth(_year, _month)
                    let time = this.calcPrevSameDay()
                    let obj = this.findMonthIndex(time)
                    this.selectDay(obj.index, obj.item)
                    this.$refs.swiper.scrollTo(1, false)  
               }

               if(index===2) {
                   this.prevMonth = this.nowMonth
                   this.nowMonth = this.nextMonth

                    //计算下一个月的数组
                    let _year = this.nowMonth[15].year
                    let _month = this.nowMonth[15].month
                    this.year = _year;
                    this.month = _month;
                    if (_month === 12) {
                        _month = 1
                        _year++
                    } else {
                        _month++
                    }
                    this.nextMonth = this.calcMonth(_year, _month)
                    let time = this.calcNextSameDay()
                    let obj = this.findMonthIndex(time)
                    this.selectDay(obj.index, obj.item)
                    this.$refs.swiper.scrollTo(1, false)  
                    
                    
               }
           },
           selected(index, item) {
                this.currentValue = item.time;
                this.$emit("selected", item);
                this.calcInit(item.year, item.month);
                this.year = item.year;
                this.month = item.month;
            },
            selectDay(index, item) {
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
                        this.year = item.year;
                        this.month = item.month;
                        this.rows = parseInt(index / 7);
                        
                        break;
                }
            }   
        },
        mounted() {
            // setTimeout(()=>{
            //     this.$refs.swiper.scrollTo(1, false)
            // },5000)
        }

    };
</script>

<style lang="less" >
@import './between-time.less';
</style>




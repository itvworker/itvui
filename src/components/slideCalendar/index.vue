<template>
    <div
        class="slide-calendar"
        @resize="resize"
        @touchstart="touchstart"
        @touchmove="touchmove"
        @touchend="touchend"
    >
        <div class="calendar-title">
            {{year}}-{{month}}
        </div>
        <div class="calendar-week-text">
            <div
                class="week-text-item"
                v-for="(item, index) in weekText"
                :key="index"
            >{{item}}</div>

        </div>
        <div
            class="calendar-box"
            ref="calendar"
            :style="{height: slideHeight+'px'}"
        >
            
            <div
                class="week-slide"
                v-show="showTop"
                ref="week"
                :style="{ transform: 'translateX('+this.weekX+'px)'}"
                :class="{animating: isAni, 'slow-action':isMove}"
                @transitionend="aniamteend"
            >
                <div class="week-item" :class="{'none-item':isWeekMin}">
                    
                    <div
                        class="day-item"
                        :class="{'day-active':currentValue===item.time}"
                        v-for="(item, index) in prevWeek"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>

                    </div>
                </div>
                <div class="week-item">
                    <div
                        class="day-item"
                        @click="selected(index,item)"
                        :class="{'day-active':currentValue===item.time}"
                        v-for="(item, index) in nowWeek"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="week-item" :class="{'none-item':isWeekMax}">
                    <div
                        class="day-item"
                        :class="{'day-active':currentValue===item.time}"
                        v-for="(item, index) in nextWeek"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
            </div>

            <div
                class="calendar"
                ref="slide"
                :class="{animating: isAni, 'slow-action':isMove}"
                @transitionend="aniamteend"
                :style="{transform: 'translateX('+this.calendarX+'px)'}"
            >
                <div class="month-item" :class="{'none-item':isCalendarMinMonth}">
                    <div
                        class="day-item"
                        :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                        v-for="(item, index) in prevMonth"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="month-item">
                    <div
                        class="day-item"
                        @click="selectDay(index, item)"
                        :class="{'day-active':currentValue===item.time,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                        v-for="(item, index) in nowMonth"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
                <div class="month-item" :class="{'none-item':isCalendarMaxMonth}">
                    <div
                        class="day-item"
                        :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                        v-for="(item, index) in nextMonth"
                        :key="item.id"
                    >
                        <div class="active">{{item.day}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="icon-bar">
            <img
                :src="icon"
                :class="{'rotate180': calendarStatus===1}"
            />
        </div>
    </div>
</template>
<script>
import slide from "./mixins/slide.js";
import init from "./mixins/init.js";
import calendar from "./mixins/calendar.js";
import { formatDate } from "./libs/too";
import { svgXml } from "../../libs/tool";
let icon =
    "data:image/svg+xml,%3csvg t='1594552144112'  viewBox='0 0 1024 1024' version='1.1' xmlns='http:%2f%2fwww.w3.org%2f2000%2fsvg' width='200' height='200'%3e%3cpath d='M18.773 361.813l476.16 474.453c8.533 8.533 23.893 8.533 34.133 0l476.16-476.16c18.773-18.773 18.773-49.493 0-66.56-18.773-18.773-49.493-18.773-66.56 0L520.533 711.679c-5.12 5.12-11.947 5.12-17.067 0L87.039 295.252c-18.773-18.773-49.493-18.773-66.56 0-20.48 17.067-20.48 47.787-1.707 66.56z' fill='iconColor' %3e%3c%2fpath%3e%3c%2fsvg%3e";

export default {
    name: "slide-calendar",
    mixins: [slide, init, calendar],
    props: {
        value: {
            type: String,
            value: formatDate("", "Y/M/D")
        },
        max: {
            type: String,
            value: ''
        },
        min: {
            type: String,
            value: ''
        },
        //星期的文字
        weekText: {
            type: Array,
            default: () => ["日", "一", "二", "三", "四", "五", "六"]
        },
        iconColor: {
            type: String,
            default: "rgba(200,200,200,1)"
        }
    },
    computed: {
        icon() {
            return icon.replace(/iconColor/gi, this.iconColor);
        }
    },
    watch: {
        value(n, o) {
            this.currentValue = new Date(formatDate(n, "Y/M/D")).getTime();
        }
    },
    data() {
        return {
            nowMonth: [], //当前月份数组
            prevMonth: [], //上月月份数组
            nextMonth: [], //下月月份数组
            monthIndex: 1,
            year: 0,
            month: 0,
            elWidth: 0, //元素的宽度,
            rowHeight: "",
            elHeight: "",
            slideHeight: "",
            calendarHeight: 0,
            nowWeek: [], // 当前星期
            prevWeek: [], //上一星期,
            nextWeek: [], //下一星期
            currentValue: new Date(formatDate(this.value, "Y/M/D")).getTime(),
            currentIndexWeek: 0,
            rows: 0,
            isAni: false,
            showTop: true
        };
    },
    methods: {
        selected(index, item) {
            this.currentValue = item.time;
            this.$emit("selected", item);
            this.calcInit(item.year, item.month);
            this.year = item.year;
            this.month = item.month;
            this.currentIndexWeek = index;
            this.findWeekRow(item.time);
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
                    this.initWeek(item.year, item.month, item.day, item.week);
                    this.year = item.year;
                    this.month = item.month;
                    this.rows = parseInt(index / 7);
                    this.findWeekIndex(item.time);
                    break;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
<template>
    <div class="slide-calendar" @resize="resize" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="calendar-title">
            {{year}}-{{month}}
        </div>
        <div class="calendar-week-text">
            <div class="week-text-item" v-for="(item, index) in weekText" :key="index">{{item}}</div>
        </div>
        <div class="calendar" ref="slide" :class="{animating: isAni}" @transitionend="aniamteend"  :style="{transform: 'translateX('+x+'px)'}">
            <div class="month-item">
                <div class="day-item" :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in prevMonth" :key="item.id">
                    {{item.day}}
                </div>
            </div>
            <div class="month-item">
                <div class="day-item" :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in nowMonth" :key="item.id">
                    {{item.day}}
                </div>
            </div>
            <div class="month-item">
                <div class="day-item" :class="{'prev-month': item.type==='prev', 'next-month': item.type==='next'}" v-for="(item, index) in nextMonth" :key="item.id">
                    {{item.day}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import slide from './mixins/slide.js'
import init from './mixins/init.js'
import calendar from './mixins/calendar.js'
export default {
    name: "slide-calendar",
    mixins: [slide, init, calendar],
    props:{
        //星期的文字
        weekText:{
            type: Array,
            default:()=>['日','一', '二', '三', '四', '五', '六']
        }
    },
    data() {
        return {
            nowMonth: [], //当前月份数组
            prevMonth: [], //上月月份数组
            nextMonth: [], //下月月份数组
            monthIndex:1,
            year: 0,
            month: 0 ,
            elWidth: 0 //元素的宽度
        }
    }

}
</script>
<style lang="less" scoped>
@import './index.less';
</style>
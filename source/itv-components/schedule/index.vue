
<script>
import touch from "./mixins/touch";
import initCalendar from "./mixins/init.calendar";
import calendar from "./mixins/calendar.js";
import methodsCalendar from './mixins/methods.calendar';
import { formatDate } from "../../libs/tool";
import calcScroll from './mixins/calc.scroll'
import animateScroll from './mixins/animate.scroll'
import animateScroller from './mixins/animate.scroller'
import move from './mixins/move'
import refreshIcon from './refresh'
import {svgXml} from '../../libs/tool'
import Vue from 'vue';

let weekname= 'week-'+parseInt(Math.random()*10000 +Math.random()*10000+Math.random()*100)
let monthname= 'month-'+parseInt(Math.random()*10000 +Math.random()*10000+Math.random()*100)
let weekHtml = {
    name:weekname,
    props:{
        item:{
            type:Object,
            default: ()=>{

            }
        },
        index: {
            type: Number,
            default: 0
        },
         //星期的文字
        weekText: {
            type: Array,
            default: () => []
        },
        monthText: {
            type: Array,
            default: () => []
        },
    },
    methods: {

    }

}

let monthHtml = {
    name:monthname,
    props:{
        item:{
            type:Object,
            default: ()=>{

            }
        },
        index: {
            type: Number,
            default: 0
        },
         //星期的文字
        weekText: {
            type: Array,
            default: () => []
        },
        monthText: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        
    }
}
let template =`
    <div class="itv-schedule-date" 
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @touchcancel="touchend"
     >
    <div class="itv-schedule-scroller" ref="scroller">
        <div class="itv-schedule-refresh" ref="pull">
            <slot name="pull">
                <refresh-icon :bgIconColor="iconBgColor" :iconColor="iconColor" v-model="isRefresh" :top="py"></refresh-icon>
            </slot>
              
        </div>
        <slot name="top"></slot>
        <!-- 日历部份 -->
            <div class="itv-schedule-calendar">
                <!-- 星期文字体  从周日到周六 -->
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
                            :class="{'day-today': today === item.key, 'overtop':!item.overtop,'day-active':currentValue===item.time,'forbid':item.number > maxMonthNumber || item.number < minMonthNumber  }"
                            v-for="(item, index) in prevWeek"
                            :key="item.id"
                        >
                            <template v-if="!weekHtml">
                                <span class="month-name" v-if="item.day===1 || index === 0">{{monthText[item.month-1]}}</span>
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="weekHtml && finishDom">
                                <${weekname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>

                        </div>
                    </div>
                    <div class="week-item">
                        <div
                            class="day-item"
                            @click="selected(index,item)"
                            :class="{'day-today': today === item.key ,'overtop':!item.overtop, 'day-active':currentValue===item.time  }"
                            v-for="(item, index) in nowWeek"
                            :key="item.id"
                        >
                           <template v-if="!weekHtml">
                                <span class="month-name" v-if="item.day===1 || index === 0">{{monthText[item.month-1]}}</span>
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="weekHtml && finishDom">
                                <${weekname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>
                        
                        </div>
                        
                    </div>
                    <div class="week-item" :class="{'none-item':isWeekMax}">
                        <div
                            class="day-item"
                            :class="{'day-today': today === item.key, 'overtop':!item.overtop, 'day-active':currentValue===item.time }"
                            v-for="(item, index) in nextWeek"
                            :key="item.id"
                        >
                            <template v-if="!weekHtml">
                                <span class="month-name" v-if="item.day===1 || index === 0">{{monthText[item.month-1]}}</span>
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="weekHtml && finishDom">
                                <${weekname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>
                        </div>
                    </div>
                </div>

                <div
                    class="calendar"
                    ref="slide"
                    :class="{animating: isAni, 'slow-action':isMove}"
                    @transitionend="aniamteend"
                    :style="{height:this.maxHeight+'px',transform: 'translateX('+this.calendarX+'px)'}"
                    
                >   
                    <div class="calendar-content">
                        <div class="month-item prev-item-month" :class="{'none-item':isCalendarMinMonth}">
                        <div class="year-tips">
                            {{prevMonth[15].year}}
                        </div>
                        <div class="month-tips">   
                            {{prevMonth[15].month}}
                        </div>
                        <div
                            class="day-item"
                            ref="day"
                            :class="{'day-today': today === item.key, 'overtop':!item.overtop, 'opacity-day':(item.type==='prev'||item.type==='next') && !isShowPrevMonth, 'prev-month': item.type==='prev',  'next-month': item.type==='next'}"
                            v-for="(item, index) in prevMonth"
                            :key="item.id"
                        >
                            <template v-if="!monthHtml">
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="monthHtml&&finishDom">
                                <${monthname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>
                        </div>
                    </div>
                    <div class="month-item now-item-month" >
                        <div class="year-tips">
                            {{nowMonth[15].year}}
                        </div>
                        <div class="month-tips">
                            {{nowMonth[15].month}}
                        </div>
                        <div
                            class="day-item"
                            @click="selectDay(index, item)"
                            :class="{ 'day-today': today === item.key ,'overtop':!item.overtop,'day-active':currentValue===item.time, 'opacity-day':(item.type==='prev'||item.type==='next') && !isShowPrevMonth, 'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                            v-for="(item, index) in nowMonth"
                            :key="item.id"
                        >
                             <template v-if="!monthHtml">
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="monthHtml&&finishDom">
                                <${monthname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>
                            
                            
                        </div>
                    </div>
                    <div class="month-item next-item-month " :class="{'none-item':isCalendarMaxMonth}">
                        <div class="year-tips">
                            {{nextMonth[15].year}}
                        </div>
                        <div class="month-tips">
                            {{nextMonth[15].month}}
                        </div>
                        <div
                            class="day-item"
                            :class="{'day-today': today === item.key, 'overtop':!item.overtop, 'opacity-day':(item.type==='prev'||item.type==='next') && !isShowPrevMonth,'prev-month': item.type==='prev', 'next-month': item.type==='next'}"
                            v-for="(item, index) in nextMonth"
                            :key="item.id"
                        >
                            <template v-if="!monthHtml">
                                <div class="active">{{item.day}}</div>
                            </template>
                            <template v-if="monthHtml&&finishDom">
                                <${monthname} :item="item" :index="index" :weekText="weekText" :monthText="monthText" />
                            </template>

                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
            <!--  @click="toggleCalendar" -->
            <div class="icon-bar" >
                <span class="icon iconfont icon-xiangshang" :class="{'rotate180': calendarStatus===1}"></span>
            </div>
            </div>
            <div class="itv-schedule-scroll">
                <div class="scroll-content" ref="scroll" @resize="refresh">
                    <slot></slot>
                </div>
            </div>
        </div>    
    </div>
`




export default {
    name:'schedule',
    template: template,
    mixins: [
        touch,
        initCalendar,
        calendar,
        methodsCalendar,
        calcScroll,
        animateScroll,
        animateScroller,
        move
    ],
    components: {
        refreshIcon
    },
    props: {
        //日历内参数
        value: {
            type: [String, Number],
            value: formatDate("", "Y/M/D")
        },
        //日历最大月分
        max: {
            type: String,
            value: ''
        },
        //日历最小月份
        min: {
            type: String,
            value: ''
        },
        //星期的文字
        weekText: {
            type: Array,
            default: () => ["日", "一", "二", "三", "四", "五", "六"]
        },
        monthText: {
            type: Array,
            default: () => ["1月", "2月","3月", "4月","5月", "6月","7月", "8月","9月", "10月","11月", "12月"]
        },
        iconBgColor: {
            type: String,
            default: 'rgba(29,120,244,0.1)'
        },
        iconColor: {
            type: String,
            default: 'rgba(29,120,244,1)'
        },
        toggleStatus: {
            type: Number,
            default: 1
        },
        //--------
        //是否启用下拉刷新
        bounceTop: {
            type: Boolean,
            default: true
        },
        //减慢的速度 百分比
        percent: {
            type: Number,
            default: 0.95
        },
        speed: {
            type: Number,
            default: 30 //滚动时的速度，1 - 100
        },
        //触发下拉加载的距离, 如果设置为0时将自动获取下拉刷新时，内容的高度
        pullDis: {
            type: Number,
            default: 0
        },
        isChangeState: { //是否可以在周与月之间切换
            type: Boolean,
            default: true
        },
        initState: { //初始化的类型  
            type: String,
            default: 'month'
        },
        //日历是否保持6行
        isKeepRows: {
            type: Boolean,
            default: false
        },
        //是否显显示上一个月月份
        isShowPrevMonth: {
            type: Boolean,
            default: false
        },
        //是否只能点当前前月份的日历
        isClickNowMonth:{
            type: Boolean,
            default: true
        },
        monthHtml: {
            type: String,
            default:''
        },
        weekHtml: {
            type: String,
            default:''
        }
    },

     data() {
        return {
            nowMonth: [], //当前月份数组
            prevMonth: [], //上月月份数组
            nextMonth: [], //下月月份数组
            monthIndex: 1,
            today: formatDate('', 'YMD'),
            year: 0,
            month: 0,
            elWidth: 0, //元素的宽度,
            rowHeight: "", //每行的高度
            elHeight: "", //元素的高度
            slideHeight: "", //元素收缩的高度过
            calendarHeight: 0,
            nowWeek: [], // 当前星期
            prevWeek: [], //上一星期,
            nextWeek: [], //下一星期
            currentValue: new Date(formatDate(this.value, "Y/M/D")).getTime(),
            currentIndexWeek: 0,
            rows: 0,
            isAni: false,
            showTop: true,
            isRefresh: false,
            pullHeight:0,
            finishDom: false
        };
        
    },

    mounted() {
        this.pullHeight = this.$refs.pull.clientHeight;
        if(this.weekHtml) {
            weekHtml.template = this.weekHtml;
            Vue.component(weekHtml.name, weekHtml);
        }
        if(this.monthHtml) {
            monthHtml.template = this.monthHtml;
            Vue.component(monthHtml.name, monthHtml);
        }
        this.finishDom = true;
        
    },
    methods: {
        svgXml,
        /** 
         * 列表内容有更新时调用
        */
        refresh() {
            this.isRefresh = false;
            if(this.py > 0) {
                this.scrollerTo(0, 0, 1)
            }
            let dom = this.$refs.scroll;
            let parent = dom.parentNode;
            let ph = dom.clientHeight;
            this.sMaxY = ph - parent.clientHeight || 0;
            if(this.sy>=this.sMaxY) {
                this.scrollDom(0, this.sMaxY, 1) 
                this.sy = -this.sMaxY
            }
        },
        
        
        
    },
        
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-schedule.less';
</style>
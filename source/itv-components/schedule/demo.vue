<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
           
            <!-- <schedule-date class="calendar-demo" :isClickNowMonth="false" isKeepRows initState="week" :isChangeState="false" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull"  /> -->
             <schedule-date class="calendar-demo" :weekHtml="weekHtml" :monthHtml="monthHtml" :isShowPrevMonth="false" :isClickNowMonth="true" :isKeepRows="false"  initState="month" :isChangeState="true" v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="false" @refresh="refresh" @pull="pull" />
           
        </itv-main>
    </itv-container>
</template>

<script>
import ScheduleDate from './index';
export default {
    components: {
        ScheduleDate
    },
    data() {
        return {
            list:[],
            currentDate: '2020/10/10',
            minMonth:'2020/10',
            maxMonth: '2021/12',
            weekHtml:`
                <div class="itv-block">
                    <span class="month-name" v-if="item.day===1 || index === 0" >{{monthText[item.month-1]}}</span>
                    <div class="active">{{item.day}}</div>
                </div>
            `,
            monthHtml:`
                <div class="active">{{item.day}}</div>
            `
        }
    },
    computed: {
    //    list() {
    //         let arr = [];
    //         for(let i = 0; i < 100; i++) {
    //             arr.push({
    //                 title: '测试内容'
    //             })
    //         }
    //         return arr;
    //    } 
    },
    methods: {
       refresh() {
           setTimeout(()=>{
                this.$refs.schedule.refresh()
           },2000)
       },
       pull(y) {
           console.log(y);
       }
    },
    created() {
      
    },
    mounted() {
        setInterval(()=>{
            this.list.push({
                title: '测试内容'
            })
        },500)
       
    }

};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
.test-list {
    padding:15ipx 15ipx;
    border-bottom: #ddd solid 1px;
   
}
.calendar-demo{
    height: auto;
}

</style>


 
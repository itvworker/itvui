<template>
    <itv-container class="page-dialog">
        <itv-header>schedule-date</itv-header>
        <itv-main>
           
            <schedule-date  v-model="currentDate" :min="minMonth" :max="maxMonth"  :bounceTop="true" @refresh="refresh" @pull="pull" ref="schedule">
                <div class="test-list" v-for="(item, index)  in list">
                    {{item.title}} {{index}}
                </div>
            </schedule-date>
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
            maxMonth: '2021/12'
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

</style>


 
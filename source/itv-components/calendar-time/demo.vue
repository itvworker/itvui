<template>
    <itv-container class="page-dialog">
        <itv-header>calendar-time</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <cell :isLink="true" subTitle="2020-08-05 10:56~2020-09-18 10:15" @click="confirm('html')" :showIcon="true" title="选择日期时间" :desc="calendarTime">
                   
                </cell>

                <cell :isLink="true" @click="alert('html')" :showIcon="true" title="日历类型" :desc="calendar">
                </cell>

                <cell :isLink="true" @click="openTime('html')" :showIcon="true" title="时间类型" :desc="time">
                </cell>
            </section>
          
            
        </itv-main>
    </itv-container>

</template>

<script>

let com = {
    name:"dome-name",
    props:{
        dome:{
            type: Object,
            default:()=>{}
        }
       
    },
    template:`
        <div class="dome-name" @click="echo">{{dome.name}}</div>
    `,
    methods: {

    }
}
import vue from 'vue';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
        show:false,
        calendarTime:"2020-09-12 10:15",
        calendar:"2020-09-12",
        time:'10:15',
        demoName:{
            name:"title",
            number: 10
        },
        show: false,
    };
  },
  methods: {
      open() {
          this.show = true
      },
      confirm(value) {
          this.$itv.calendarTime.show({
               minDate: '2020-08-05 10:56',
               value: this.calendarTime,
               maxDate: '2020-09-18 10:15',
               style:"average",
               confirm:(res)=>{
                   this.calendarTime = res;
               }
          })
      },
      alert() {
            this.$itv.calendarTime.show({
                value: this.calendar,
                dateType: 'calendar',
                confirm:(msg) => {
                    this.calendar = msg
                }
            })
      },
      openTime() {
            this.$itv.calendarTime.show({
                value: this.time,
                titleText:"请选择时间",
                minDate: '10:05',
                maxDate: '23:59',
                dateType: 'time',
                confirm:(msg) => {
                    this.time = msg
                }
            })
      },
      page() {
         
      },
      echo() {
          console.log(this.demoName);
          this.demoName.name = '你是个标题'
      }
  },
  mounted() {
    //   Vue.component(Component.name, Component);
     com.methods.echo =this.echo.bind(this);
     vue.component(com.name, com)
     this.show = true;
     
      
  },
};
</script>

<style lang="less" scoped>
.page-dialog {
    .page-content{
        display: none;
    }
}
.demo {
  padding-left: 0;
  padding-right: 0;
}
h4 {
  padding: 0 10px;
}
</style>

<template>
    <itv-container>
        <itv-header>Datetime</itv-header>
        <itv-main>
            <itv-cell :showIcon="true" title="日期选择" subTitle="去除显示的格式" :desc="date || placeholder" @click="openDate" >
            </itv-cell>
            <itv-cell :showIcon="true" title="日期时间选择器" subTitle="限制开始结束日期" :desc="datetime || placeholder" @click="openDatetime" >
            </itv-cell>
            <itv-cell :showIcon="true" title="时间选择" subTitle="限制开始结束日期" :desc="time || placeholder" @click="openTime" >
            </itv-cell>
        </itv-main>
    </itv-container>
</template>
<script>

export default {
    components: {
    
        
    },
    props: {
        
    },
    data(){
        return{
           
                    value: true,
                    datetime: '',
                    placeholder:'请选择',
                    date:'',
                    time:''
                    
           }
       
    },
    methods:{
        openDatetime() {
            
            this.$itv.datepicker.show({
                defaultValue:this.datetime,
                startDate:'2019-08-20 12:25',
                endDate:'2022-08-20 12:30',
                type:'datetime',
                confirm:(value)=> {
                    this.datetime = value[5]
                }
            })
        },

        openDate(value, keyIndex, index) {
            this.$itv.datepicker.show({
                defaultValue:this.date,
                type:'date',
                removeFormat: true,
                confirm:(value)=> {
                    this.date = value[3]
                }
            })
        },

        openTime() {
            this.$itv.datepicker.show({
                defaultValue:this.time,
                type:'time',
                isSetSecond: true,
                confirm:(value)=> {
                    
                    this.time = value[3]
                }
            })
        },

        
        add() {
            this.inputList.push({
                name:'内容'
            })
        }
    }
}
</script>

<style lang="less" >
@import './datepicker.less';
</style>

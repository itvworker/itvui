<template>
    <itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
         <banner  direction="column" :loop="true" v-model="columnIndex" @change="change" class="itv-swpier-height">
                <banner-item>
                    <div class="demo-banner banner-1">1</div>
                </banner-item>
                <banner-item>
                    <div class="demo-banner banner-2">2</div>
                </banner-item>
                <banner-item>
                    <div class="demo-banner banner-1">3</div>
                </banner-item>
                <banner-item>
                    <div class="demo-banner banner-2">4</div>
                </banner-item>
            </banner>   
    </itv-dialog>
</template>

<script>
    import render from './render'
    import swiper from '../swiper/swiper'
    import swiperItem from '../swiper-item/swiper-item.vue'
    import pickerSlot from '../picker/picker-slot.vue'
    import ItvDialog from '../dialog/dialog'
    export default {
        name: 'drawer',
        components: {
            swiper,
            swiperItem,
            pickerSlot,
            ItvDialog
        },
        data() {
            return {
               isVisible: true,
               hideOnClick: false

            }
        },
        methods: {
           change(index) {
               if(index===0) {
                    this.nextMonth = this.nowMonth
                    this.nowMonth = this.prevMonth
                    let _year = this.year
                    let _month = this.month

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
                    // if (this.isClickChange) {
                    //     let obj = this.findMonthIndex(this.currentValue)
                    //     this.selectDay(obj.index, obj.item)
                    // }

                    // if (!this.isClickChange) {
                    //     let time = this.calcPrevSameDay()
                    //     let obj = this.findMonthIndex(time)
                    //     this.selectDay(obj.index, obj.item)
                    // }
                    // this.isClickChange = false
               }
           }
        },
        mounted() {
            
        }

    };
</script>

<style lang="less" scoped>
@import './between.less';
</style>



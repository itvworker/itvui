<template>
    <itv-container>
        <itv-header>itv-swiper</itv-header>
        <itv-main>

            <h2>横向</h2>
            <banner :loop="true" @change="row" v-model="rowIndex">
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
                <div slot="dot" class="dot-bar">
                    <div class="dot" :class="{'active': rowIndex===0}" @click="change(0)">1</div>
                    <div class="dot" :class="{'active': rowIndex===1}" @click="change(1)">2</div>
                    <div class="dot" :class="{'active': rowIndex===2}" @click="change(2)">3</div>
                    <div class="dot" :class="{'active': rowIndex===3}" @click="change(3)">4</div>
                </div>
            </banner>
            <h2>纵向</h2>
            <banner  direction="column" :loop="false" v-model="columnIndex" class="itv-swpier-height">
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
        </itv-main>
    </itv-container>

</template>

<script>
import banner from './swiper.vue'
import bannerItem from '../swiper-item/swiper-item.vue'
export default {
    components: {
        banner,
        bannerItem 
    },
    data() {
        return {
            rowIndex:2,
            columnIndex: 2
        };
    },
    methods: {
        open() {
            console.log('link----------');
        },
        row(e) {
            console.log(e);
        },
        change(index) {
            this.rowIndex = index;
        }
    },
    mounted() {
        console.log(this.$children);
    }
};
</script>

<style lang="less" >
@import './swiper.less';
@import '../swiper-item/swiper-item.less';

</style>
<style lang="less" scoped>
.banner-1{
    background-color: #eee;
    
}
.banner-2{
    background-color: #ddd;
   
}
.banner-2,.banner-1 {
      height: 200px;
    align-items: center;
    justify-content: center;
    display: flex;
    font-size: 100pt;   
}
.itv-swpier-height {
    height:600pt;
    .banner-2,.banner-1{
        height: 600pt;
    }
}
.dot-bar{
    position: absolute;
    bottom: 20pt;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .dot{
        width: 32pt;
        height: 32pt;
        text-align: center;
        background-color: #fff;
        margin:0 4pt;
        border-radius: 8pt;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        line-height: 0;
        &.active{
            background-color: #e1251b;
            color: #fff;
        }
    }
    
}
</style>

<template>
    <itv-container>
        <itv-header>itv-mini-swiper</itv-header>
        <itv-main>

            <h2>横向</h2>
            <mini-swiper :loop="true" @change="row" v-model="rowIndex">
                <mini-swiper-item>
                    <div class="demo-banner banner-1">1</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-2">2</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-1">3</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-2">4</div>
                </mini-swiper-item>
                <div slot="dot" class="dot-bar">
                    <div class="dot" :class="{'active': rowIndex===0}" @click="change(0)">1</div>
                    <div class="dot" :class="{'active': rowIndex===1}" @click="change(1)">2</div>
                    <div class="dot" :class="{'active': rowIndex===2}" @click="change(2)">3</div>
                    <div class="dot" :class="{'active': rowIndex===3}" @click="change(3)">4</div>
                </div>
            </mini-swiper>
            <h2>纵向</h2>
            <mini-swiper  direction="column" :loop="false" v-model="columnIndex" class="itv-swpier-height">
                <mini-swiper-item>
                    <div class="demo-banner banner-1">1</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-2">2</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-1">3</div>
                </mini-swiper-item>
                <mini-swiper-item>
                    <div class="demo-banner banner-2">4</div>
                </mini-swiper-item>
            </mini-swiper>
        </itv-main>
    </itv-container>

</template>

<script>
export default {
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
    font-size: 100ipx;   
}
.itv-swpier-height {
    height:600ipx;
    .banner-2,.banner-1{
        height: 600ipx;
    }
}
.dot-bar{
    position: absolute;
    bottom: 20ipx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    .dot{
        width: 8ipx;
        height: 8ipx;
        text-align: center;
        background-color: #fff;
        margin:0 4ipx;
        border-radius: 8ipx;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999;
        line-height: 0;
        font-size: 0;
        &.active{
            background-color: #e1251b;
            color: #fff;
        }
    }
    
}
</style>

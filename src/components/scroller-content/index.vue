<template>
    <div class="itv-scroller-content">
        <div class="itv-scroler-box">
            <div class="itv-scroller-refresh">
                <div class="icon-bar-word">
                     <loading :percent="percent" :arrow="arrow"  />    
                     <span class="word">下拉刷新</span>
                </div>
                
            </div>  
            <slot />
        </div>
    </div>
</template>

<script>
import loading from './loading'
export default {
    components: {
        loading
    },
    props: {
       
    },
    mounted() {
        
    },
    data() {
        return  {
            y:0,
            x:0,
            maxScrollY: 0,
            maxScrollX: 0,
            percent:40,
            arrow: false
        }

    },
    watch: {
        y(n, o) {
            if(n>=0) {
                this.percent = 0;
                this.arrow = true;
                return
            }

            if(Math.abs(n)>60) {
                this.percent = 85
                this.arrow = false;
                return
            }

            if(Math.abs(n)<60 && Math.abs(n)>0) {
                this.arrow = true;
                this.percent = Math.abs(n)/70.588*100
            }
           
        }
    },
    methods: {
        
    }
}
</script>
<style lang="less" scoped>
.itv-scroller-content{
    width: 100%;
    position: relative;
    flex: 0 0 auto;
    .itv-scroller-refresh{
        position: absolute;
        transform: translate(0,-100%);
        left: 0px;
        right: 0px;
        text-align: center;
    }

}
.icon-bar-word{
    background-color: #ddd;
    height: 60px;
    color: #999;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-top: 20px;
    justify-content: center;
    padding-bottom: 10px;
    .word{
        padding-left: 8px;
    }
}
</style>
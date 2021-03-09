<template>
    <itv-container class="page-dialog">
        <itv-header>Itvscroll</itv-header>
        <div class="flex-row-box">
            <div class="flex-row-item" :class="{active:tabIndex===0}" @click="changeTab(0)" >竖向滚动</div>
            <div class="flex-row-item" :class="{active:tabIndex===1}" @click="changeTab(1)" >横向滚动</div>
            <div class="flex-row-item" :class="{active:tabIndex===2}" @click="changeTab(2)" >竖向滚动</div>
        </div>
        <itv-main>
           

            <itv-scroll 
            v-if="tabIndex===0" 
            :key="0" ref="scrolle2" 
            :topBounce="true" 
            :bottomBounce="true" 
            :pullDown="true" 
            pattern="auto" 
            :showScrollBar="true"
            @scroll="scroll" 
            @stopscroll="stopscroll"
            @refersh="refersh">
                <itv-scroll v-if="tabIndex===0" ref="scroller3" :showScrollBar="true" :leftBounce="true" :rightBounce="true"  :percent="0.9" pattern="horizontal" class="case-box">
                    <div class="itv-case-box">
                        <div class="item-list-section" v-for="(item, index) in list" :key="index">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </itv-scroll>
               <div class="item-list" v-for="(item, index) in list" :key="index">
                   {{item.name}}{{index}}
               </div>
               <!-- <div class="itv-case-box">
                    <div class="item-list-section" v-for="(item, index) in list" :key="index">
                        {{item.name}}{{index}}
                    </div>
                </div> -->
            </itv-scroll>

            <itv-scroll v-if="tabIndex===1" ref="scrolle4" pattern="freedom" :key="1"  :showScrollBar="true" >
               <div class="msg-word">
                    {{word}}
               </div>
            </itv-scroll>
            <itv-scroll v-if="tabIndex===2" ref="scrolle5" pattern="vercial" :key="2"  :showScrollBar="false" >
                
            </itv-scroll>
        </itv-main>
        

    </itv-container>
</template>

<script>
import itvScroll from './itvscroll';
import "./itvscroll.less";
import data from './data'
export default {
    mixins:[data],
    components: {
        itvScroll
    },
    data() {
        return {
          list:[],

        }
    },
    computed: {
        tabIndex() {
            let index = parseInt(this.$route.query.index)
            return index || 0
        }
    },
    methods: {
        changeList(size, page) {
            for(let i = 0; i <= size; i++) {
                this.list.push({
                    name: '测试一下内容条数'
                })
            }
        },
        scroll(obj) {
            console.log(`scroll:{ x: ${obj.x}, y: ${obj.y} }`);
        },
        stopscroll(obj) {
            console.log(`stopscroll:{ x: ${obj.x}, y: ${obj.y} }`);
            
        },
        refersh() {
            console.log('下拉刷新');
            //    setTimeout(()=>{
                
            //        this.$refs.scroller.refresh()
            //    },3000)
        },
        changeTab(index) {
            if(this.tabIndex === index) return
            let name = this.$route.name;
            this.$router.replace({
                name: name,
                query: {
                    index: index
                }
            })
        } 
    },
    created() {
        this.changeList(50,1)
    },
    mounted() {
       
    }

};
</script>

<style lang="less" scoped>
.item {
    height: 60ipx;
    border-bottom: #ddd solid 1px;
    line-height: 30ipx;
    padding: 15ipx;
    box-sizing: border-box;
    font-size: 18ipx;
}

.tab-meun{
    height: 44rpx;
    display: flex;
    .tab-btn{
        height: 44ipx;
        flex: 1;
        text-align: center;
        line-height: 44ipx;
        font-size: 16ipx;
        border-bottom: #ddd solid 1px;
        &.active {
            color: @itv-page-main;
            border-bottom: @itv-page-main solid 2px;
        }
    }
}

.item-list{
    border-bottom: #eee solid 1px;
    padding: 10ipx;
    line-height: 24ipx;
}

.flex-row-box{
    display: flex;
    .flex-row-item {
        flex:1;
        padding: 10ipx 0;
        text-align: center;
        line-height: 24ipx;
        border-bottom: #ddd solid 1px;
        &.active{
            color: #e1251b;
            border-bottom: #e1251b solid 2ipx;
        }
    }
}
.itv-case-box {
    
    padding: 5ipx;
    display: flex;
    width: 100%;

    .item-list-section{
        width: 120ipx;;
        border:#ddd solid 1px;
        margin: 5ipx;
        height: 120ipx;
        line-height: 120ipx;
        flex:0 0 auto;
        text-align: center;
        flex-wrap: nowrap;
        
    }
}

.case-box{
    height: 140ipx;
}
.msg-word{
    font-size: 16ipx;
    width: 2000ipx;
    line-height: 32ipx;
    color: #666;
}

</style>


 
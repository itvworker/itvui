<template>
    <itv-container class="page-dialog">
        <itv-header>Scroller</itv-header>
        <div class="tab-meun">
            <div class="tab-btn" :class="{'active': index===0}" @click="tabIndex(0)">新闻哥</div>
            <div class="tab-btn" :class="{'active': index===1}" @click="tabIndex(1)">什么人</div>
            <div class="tab-btn" :class="{'active': index===2}" @click="tabIndex(2)">看什么</div>
        </div>
        <itv-main>
            <nut-scroller @ontab="change" ref="scroller" >
                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in list" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>
                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in other" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>

                <scroller-content>
                    <div  class="nut-vert-list-panel">
                        <div class="item" v-for="(item, index) in news" @click="alert(item, index)">
                            {{item.name}}{{index}}
                        </div>
                    </div>
                </scroller-content>
            </nut-scroller>
        </itv-main>

    </itv-container>
</template>

<script>
import nutScroller from './scroller'
import scrollerContent from '../scroller-content'
import "./scroller.less";
export default {
    components: {
        nutScroller,
        scrollerContent
    },
    data() {
        return {
            list:[],
            other: [],
            news: [],
            ismore: false,
            isloading: false,
            index: 0
        }
    },
    methods: {
        tabIndex(index) {
            this.index = index;
            this.$refs.scroller.changeTab(index)
        },
        change(index) {
            this.$refs.scroller.restartRefresh()
            this.index = index;
            this.isloading = false

        },
        alert(item, index) {
            alert(item.name+index,)
        },
        createList(value) {
            for(let i = 0; i < value; i++) {
                this.list.push({
                    name:'我是新闻哥'
                })
                this.other.push({
                    name:'你是什么人'
                })
                this.news.push({
                    name:'你想看什么'
                })
            }
        },
        pulldown(e) {
            debugger
            this.isloading = true;
            setTimeout(() => {
                console.log('------------');
                this.list = [];
                this.createList(100);
                this.isloading  = false;
            }, 3000);
        },
        loadmore() {
            this.isloading = true;
            setTimeout(() => {
                this.createList(20);
                this.isloading = false;
            }, 3000);
        }
    },
    mounted() {
        this.createList(100)
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
</style>


 
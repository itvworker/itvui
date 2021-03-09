<template>
    <itv-container class="page-dialog">
        <itv-header>sliver-container</itv-header>
        <itv-main>
           
            <sliver-container 
            ref="sliver"
            :bounceTop="false"
            :headerMaxHeight="headerMaxHeight"  
            :headerMinHeight="headerMinHeight" 
            :sliverIndex="sliverIndex"
            :refreshLoad="true"
            @refresh = refresh
            >   <div class="text-header" ref="header"  slot="header">
                    <img @click="opend" class="image-header" src="~@/assets/img/github.png" />
                    <div class="demo-tab" ref="btns">
                        <div class="demo-tab-btn" @click="columnIndex=0" :class="{'active': columnIndex === 0}">
                            新闻
                        </div>
                         <div class="demo-tab-btn" @click="columnIndex=1" :class="{'active': columnIndex === 1}">
                            公告
                        </div>
                    </div>
                </div>
                
                 <mini-swiper   :loop="false" v-model="columnIndex" class="itv-swpier-height">
                     <mini-swiper-item class="mini-swiper-item">
                         <sliver  :bounceTop="false" refreshLoad bounceBottom @refresh = refresh ref="sliver0" >
                            <div class="test-list" v-for="(item, index)  in list" :key="index" @click="casePush">
                                sliver1{{item.title}} {{index}}
                            </div>
                        </sliver>
                     </mini-swiper-item>
                     <mini-swiper-item class="mini-swiper-item">
                         <sliver  :bounceTop="true" refreshLoad bounceBottom @refresh = refresh ref="sliver1" >
                            <div class="test-list" v-for="(item, index)  in list" :key="index">
                                sliver2{{item.title}} {{index}}
                            </div>
                        </sliver>
                     </mini-swiper-item>
                 </mini-swiper>
            </sliver-container>
        </itv-main>
    </itv-container>
</template>

<script>

export default {
    data() {
        return {
            // list:[],
            currentDate: '2020/10/10',
            minMonth:'2020/10',
            maxMonth: '2021/12',
            sliverIndex: 0,
            columnIndex:0,
            headerMinHeight: 44,
            headerMaxHeight: 200
        }
    },
    watch: {
        columnIndex(index, old) {
            this.$refs['sliver'+index].sliverIndex();
        }
    },
    computed: {
       list() {
            let arr = [];
            for(let i = 0; i < 100; i++) {
                arr.push({
                    title: '测试内容'
                })
            }
            return arr;
       } 
    },
    methods: {
       refresh() {
           
           setTimeout(()=>{
                this.$refs.sliver.refresh()
                this.$refs.sliver0.refresh()
                this.$refs.sliver1.refresh()
           },2000)
       },
       casePush() {
           alert('content')
       },
       pull(y) {
           
       },
       opend() {
           
       }
    },
    created() {
        
    },
    mounted() {
        // setInterval(()=>{
        //     this.list.push({
        //         title: '测试内容'
        //     })
        //     // this.$refs.sliver0.refresh()
        //     // this.$refs.sliver1.refresh()
        // },500)
        this.$refs.sliver0.sliverIndex()
        this.headerMaxHeight = this.$refs.header.clientHeight;
        this.headerMinHeight = this.$refs.btns.clientHeight;
        this.$refs.sliver-container.refresh()
        
       
    }

};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
.test-list {
    padding:15ipx 15ipx;
    border-bottom: #ddd solid 1px;
    background-color: #eee;
}
.text-header {
    position: relative;
    font-size: 0;
    .demo-tab {
        height: 44ipx;
       
      
        bottom: 0;
        width: 100%;
        display: flex;
        font-size: 15ipx;
        background-color: #fff;
        .demo-tab-btn {
            flex: 1;
            height: 44ipx;
            display: flex;
            justify-content: center;
            align-items: center;
            line-height: 0;
            position: relative;
            &.active {
                color: @itv-primary-color;
                &::after {
                    position: absolute;
                    content: ' ';
                    width: 20%;
                    height: 2ipx;
                    background-color: @itv-primary-color;
                    bottom: 0px;
                }
            }
        }

    }
}
.image-header{
    width: 100%;
    height: 200ipx;
}
.itv-swpier-height{
    height: 100%;
}
</style>


 
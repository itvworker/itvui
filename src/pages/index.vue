<template lang="html">
    <itv-container class="seciton">
        <div class="itv-bar">
            <div class="itv-logo">
                iTV
            </div>
            <div class="nav">
                <div class="nav-item" v-for="item in navs" @click.stop="topage(item)">
                    {{item.name}}
                </div>
                                   
            </div>
        </div>
        <router-view />
    </itv-container>
</template>

<script>
export default {
    data() {
        return {
            navs:[
                {
                    name: "介绍",
                    routerName: ''
                },
                {
                    name: "组件",
                    routerName: 'itv_doc_index'
                },
                {
                    name: "主题",
                    routerName: ''
                },
                {
                    name: "发布日志",
                    routerName: ''
                },
                {
                    name: "捐赠、赞助",
                    routerName: ''
                },
                {
                    name: "DEMO",
                    routerName:'itv_demo_enter'
                }
            ]
        }
    },
    mounted() {
        
        
    },
    methods: {
        topage(item) {
            this.$router.push({
                name:item.routerName
            })
        }
    }
}
</script>

<style lang="less" scoped>
.itv-bar{
    height: 80px;
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom:#ddd solid 1px;
    .itv-logo{
        height: 80px;
        font-size: 40px;
        line-height: 80px;
        color: @itv-page-main;
    }
    .nav{
        display: flex;
        font-size: 14px;
        .nav-item{
            padding: 10px;
        }
    }
   
}
.seciton{
    max-width: 1200px;
    margin: auto;
    
}

</style>

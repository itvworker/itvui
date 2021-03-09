<template>
    <itv-container>
        <itv-header>ITV</itv-header>
        <itv-main>
            <section class="demo-content">
                <div class="dot-link" v-for="item in navs" @click.stop="topage(item)">
                    <i :class="item.icon"></i>
                    <div class="name">{{item.name}}</div>
                </div>
            </section>
        </itv-main>    
    </itv-container>

</template>

<script>
import layout from './layout'
export default {
    mixins:[layout],
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.show = true;
        },
        plugin(value) {
            this.$itv.popup.confirm({
                html: "weg",
                hideOnClick: true,
                text: ""
            });
        },
        topage(item) {
            this.$router.push({
                name: item.routerName
            })
        }
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.demo-content {
    display: flex;
    flex-wrap: wrap;
    .dot-link{
        height: 100ipx;
        flex: 0 0 auto;
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-size: 16ipx;
        border-right: #ddd solid 1px;
        border-bottom: #ddd solid 1px;
        box-sizing: border-box;
        .name{
            line-height: 40ipx;
        }
        i{
            color:@itv-page-main;
        }
        &:nth-child(4n) {
            border-right: #ddd solid 0px;
        }
    }
}

</style>

<template>
    <itv-container class="page-dialog">
        <itv-header>Actionsheet</itv-header>
        <itv-main>
            <div class="h10"></div>
          
                <cell
                    @click="open"
                    title="我是标题"
                    desc="描述文字"
                >
                </cell>
                
        </itv-main>
        
    </itv-container>

</template>

<script>


export default {
    data() {
        return {
            show: false
        };
    },
    methods: {
        open() {
            this.$itv.actionsheet.show({
                items:[
                    {
                        text:'选项一'
                    },
                    {
                        text:'选项二'
                    }
                ]
            })
        },
        plugin(value) {
            this.$itv.popup.confirm({
                html: "weg",
                hideOnClick: true,
                text: ""
            });
        },
        page() {
            console.log("page------");
        }
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.page-dialog {
    .page-content {
        display: none;
    }
}
.demo {
    padding-left: 0;
    padding-right: 0;
}
h4 {
    padding: 0 10px;
}
</style>

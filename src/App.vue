<template lang="html">
    <router-view />
</template>

<script>
import $ from 'jquery'
import Router from 'vue-router'
export default {
    mounted() {
        Router.$on('push go',this.changeRoute)
        setTimeout(()=>{
             Router.$off('push go',this.changeRoute)
        },2000)
       
        $(document).on('click','.doc-tab-group>.tab-item-btn', function(e){
            e.stopPropagation();
            let index = $(this).index();
            $(this).parent().find('.tab-item-btn').removeClass('active')
            $(this).addClass('active')
            let html = $(this).parent().next().children()
            html.hide()
            html.eq(index).show()
        })
        if(this.IsPC()) {
            $('html').css('font-size', '37.5px')
        }
    },
    methods: {
        changeRoute(value, content) {
            console.log(value);
        },
        IsPC() {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone",
                        "SymbianOS", "Windows Phone",
                        "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

    }
}
</script>
<style lang="less">
body,html{
    padding: 0px;
    margin: 0px;
    height: 100%;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
#app {
    background-color: @itv-page-white;
}
</style>

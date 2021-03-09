<template>
    <label class="itv-label">
        <div class="itv-label-title">
         *{{label}}
         
        </div>
        <div class="itv-label-content">
            <slot />
        </div>
    </label>
</template>

<script>
    export default {
        name: 'itv-label',
        props: {
            label: {
                type: String,
                defaut: ''
            },
            prop: {
                type: String,
                defaut: ''
            }
        },
        data(){
            return {
                
            }
        },
        methods:{
            vaildate(value, type) {

            }
        }
    }
</script>

<style lang="less" >
.itv-label {
    display: flex;
    border-bottom: #eee solid 1px;
    padding: 10.5ipx 15ipx;
    line-height: 1.6;
    font-size: 14ipx;
    align-items: center;

    .itv-label-content{
        flex: 1;
        display: flex;
        align-items: center;
    }
    .itv-label-title{
        // margin-right: 10ipx;
       
        box-sizing: border-box;
        display: flex;
        width: 50ipx;   
        height: 22ipx;
        line-height: 22ipx;
        // background-color: #aaa;
        
    }
    
}
</style>

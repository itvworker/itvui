<template>
    <label class="itv-label">
        <div class="itv-label-title">
            {{label}}
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
    min-height: 44ipx;
    border-bottom: #eee solid 1px;
    .itv-label-title{
        height: 100%;
        line-height: 44ipx;
        min-width: 80ipx;
        font-size: 14ipx;
        padding-left: 15ipx;
    }
    .itv-label-content{
        flex: 1;
        input {
            height: 100%;
            font-size: 14ipx;
            width: 100%;
        }
    }
    
}
</style>

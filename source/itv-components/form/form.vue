<template>
    <form>
        <slot />
    </form>
</template>

<script>

    export default {
        name: 'itv-form',
        props: {
            rules: {
                type: Object,
                default: ()=>{}
            },
            model: {
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return{
            }
        },
        methods:{
            vaildate(value, type) {
                
            }
        },
        updated() {
           
        }
    }
</script>

<style lang="less">
</style>

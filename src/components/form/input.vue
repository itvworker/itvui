<template>
<div class="itv-input-">
    <input :type="type" :placeholder="placeholder"
           :maxlength="maxlength" :minlength="minlength"
           @input="input" @change="change"  @blur="blur"
    />
    <i></i>
</div>
    
</template>

<script>
    export default {
        name: 'itv-input',
        props: {
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            maxlength: {
                type: Number,

            },
            minlength: {
                type: Number
            }
        },


        data(){
            return {
                name:'itv-input'
            }
        },
        methods:{
            vaildate(value, type) {

            },
            input() {

                console.log(this.$parent.name)
            },
            blur() {

            },
            change() {

            }
        }
    }
</script>

<style lang="less">
</style>

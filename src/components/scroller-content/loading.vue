<template>
     <svg class="course-progss" viewBox="0 0 12 12" :style="{width:this.width,height:this.height}">
        <!-- <path d="M 0.5 6 a 5.5 5.5 0 0 1 11 0 a 5.5 5.5 0 0 1 -11 0z" fill-opacity="0" :stroke="boderColor" stroke-width="1"
            style="stroke-dashoffset: 36px; stroke-dasharray: 37.68px, 37.68px;"></path> -->

        <path d="M 6 0.5 a 5.5 5.5 0 1 0 0 11 a 5.5 5.5 0 0 0 0 -11z" fill-opacity="0"  stroke-linecap="round" :stroke="boderColor" stroke-width="1"
            :style="{'stroke-dashoffset': circumference }" style="stroke-dasharray: 37.68px, 37.68px;"
        ></path>    
        
        <path v-show="arrow" d="M 6 2.5 l 0 7" :stroke="boderColor"  stroke-width="1"  stroke-linecap="round" ></path> 
        <path v-show="arrow" d="M 3.5 7.5 l 2.5 2"  stroke-linecap="round" :stroke="boderColor"  fill-opacity="0"  stroke-width="1" ></path>
        <path v-show="arrow" d="M 8.5 7.5 l -2.5 2"  stroke-linecap="round" :stroke="boderColor"  fill-opacity="0"  stroke-width="1" ></path>
    </svg>
</template>
<script>
export default {
    props: {
        width: {
            type: String,
            default: '12rpx'
        },
        height: {
            type: String,
            default: '12rpx'
        },
        percent: {
            type: Number,
            default: 30
        },
        boderColor: {
            type: String,
            default: '#3aa5ff'
        },
        fillColor: {
            type: String,
            default: 'transparent'
        },
        arrow:{
            type: Boolean,
            default: true
        }
    },

    computed: {
        circumference() {
           return 37.68 - this.percent/100*37.68+'px'
        }
    }
}
</script>
<style lang="less">

.course-progss {
   
    width: 22ipx;
    height: 22ipx;
}
</style>

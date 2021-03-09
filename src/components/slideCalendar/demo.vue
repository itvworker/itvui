<template>
    <itv-container>
        <itv-header>schedule</itv-header>
        <div class="pt79"></div>
        <slide-calendar ref="calendar" min="2020/7" max="2020/9"  />
        <slide-calendar ref="calendar"   />
        <div class="itv-page-content">
            <div class="pt6"></div>
            <div class="pt5"></div>
        </div>

    </itv-container>
</template>

<script>
    import SlideCalendar from './index';
    export default {
        components: {
            SlideCalendar
        },
        data() {
            return {

            }
        },
        methods: {
           
        },
        mounted() {

        }

    };
</script>

<style lang="less" scoped>
.pt79{
    height: 79ipx ;
}

.pt6{
    height: 300ipx;
    background-color: #ddd;
}
.pt5{
    height: 250ipx;
    background-color: #ccc;
}
</style>



<template>
    <itv-container>
        <itv-header>schedule</itv-header>
        <slide-calendar ref="calendar" min="2020/7" max="2020/9"  />
        <div class="itv-page-content" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
                
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
            touchstart(e) {
                this.$refs.calendar.touchstart(e)
            },
            touchmove(e) {
                this.$refs.calendar.touchmove(e)
            },
            touchend(e){
                this.$refs.calendar.touchend(e)
            }
        },
        mounted() {

        }

    };
</script>

<style lang="less" scoped>

</style>



<template>
    <div class="itv-swpier-item">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "mini-swiper-item",
    data() {
        return {
            name: 'itv-swpier-item'
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-mini-swiper-item.less';
</style>
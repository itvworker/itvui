<template>
    <div
        class="slide-btn"
        @click="$emit('click')"
    >
        <slot />
    </div>
</template>
<script>
export default {
    name: "slidebutton"
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-slidebutton.less';
</style>

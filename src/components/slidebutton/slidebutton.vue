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
    name: "slideButton"
};
</script>
<style lang="less" scoped>
.slide-btn {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 11ipx;
    padding-right: 11ipx;
    font-size: 16ipx;
}
</style>

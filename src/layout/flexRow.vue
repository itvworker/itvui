<template lang="html">
    <div class="itv-flex-rows-box">
        <slot></slot>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="less" >
.itv-flex-rows-box{
    display: flex;
    flex-direction: row;
    height: 44ipx;
    >div{
        flex: 1;
    }
}
</style>

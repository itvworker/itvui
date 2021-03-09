<template>
    <itv-container class="page-slideout">
        <itv-header>Circle</itv-header>
        <itv-main>
            <touch-circle :strokeWidth="10" :radius="45"  />
        </itv-main>
    </itv-container>

</template>

<script>
import touchCircle from "./index.vue";
export default {
    components: {
        touchCircle
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    }
};
</script>

<style lang="less" scoped>
</style>

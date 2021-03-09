<template lang="html">
      <section class="itv-main-page">
          <slot></slot>
      </section>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.itv-main-page{
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>

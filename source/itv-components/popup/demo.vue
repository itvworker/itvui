<template>
    <itv-container class="page-dialog">
        <itv-header>popup</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                <cell :isLink="true" @click="confirm('html')" :showIcon="true" title="Confirm">
                </cell>

                <cell :isLink="true" @click="alert('html')" :showIcon="true" title="Alert">
                </cell>
            </section>
        </itv-main>
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        show:false
    };
  },
  methods: {
      open() {
          this.show = true
      },
      confirm(value) {
          this.$itv.popup.confirm({
              title:"你是谁",
              content:"我是提示的内容",
              hideOnClick: true
          })
      },
      alert() {
          this.$itv.popup.alert({
              title:"你是谁",
              content:"我是提示的内容",
              hideOnClick: true,
              onHide() {
                console.log('hide---');
              },
              onConfirm() {
                console.log('confirm---');
              }
          })
      },
      page() {
          console.log('page------');
      }
  },
  mounted() {

  }
};
</script>

<style lang="less" scoped>
.page-dialog {
    .page-content{
        display: none;
    }
}
.demo {
  padding-left: 0;
  padding-right: 0;
}
h4 {
  padding: 0 10px;
}
</style>

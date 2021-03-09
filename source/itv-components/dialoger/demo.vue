<template>
    <itv-container class="page-dialog">
        <itv-header>dialog</itv-header>
        <itv-main>
            <div class="h10"></div>
            <section>
                
                <cell :showIcon="true" title="中间弹出" @click="show=true"  desc="中间弹出">
                </cell>

                <cell :showIcon="true" title="向下弹出" @click="bottomShow=true"  desc="向下弹出">
                </cell>

                <cell :showIcon="true" title="从上弹出" @click="topshow=true"  desc="从上弹出">
                </cell>
            
            </section>
        </itv-main>
        <dialoger v-model="show" :hideOnClick="true">
            <div class="dialog-center">
                中间弹出的内容
            </div>
            
            </dialoger>
        <dialoger v-model="bottomShow" type="bottom" :hideOnClick="true">
            <div class="slide-bottom">
                我是向下弹出来的内容
            </div>
           
        </dialoger>

        <dialoger v-model="topshow" type="top" :hideOnClick="true">
            <div class="slide-bottom">
                我是向上弹出来的内容
            </div>
        </dialoger>
       
    </itv-container>

</template>

<script>
export default {
  data() {
    return {
        show:false,
        bottomShow: false,
        topshow: false
    };
  },
  methods: {
      open() {
          this.show = true
      },
      plugin(value) {
          if(value){
              this.$itv.dialog.show({
                  html: 'weg'
              })
          }else{
              this.$itv.dialog.show({
                  html: this.$refs.page
              })
          }

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
.slide-bottom{
    background-color: #fff;
    height: 400ipx;
    width: 100%;
}
.dialog-center{
    width: 200ipx;
    height: 200ipx;
    background-color: #fff;
    display: flex;
    align-content: center;
    justify-content: center;
}
</style>

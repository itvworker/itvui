<template>
  <itv-container class="slider-demo demo-list">
    <itv-header>slider</itv-header>
    <itv-main>
        <h4>基本用法----</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider v-model="val1" :range="[0,10]"></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val1}}</span>
          </cell>
        </div>
        <h4>拖动时展示标签</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider v-model="val2" :range="[0,100]" :showLabel="true"></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val2}}</span>
          </cell>
        </div>
        <h4>一直展示标签</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider v-model="val3" :range="[0,100]" :showLabel="true" :showLabelAlways="true"></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val3}}</span>
          </cell>
        </div>
        <h4>两端显式可选取范围</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider v-model="val4" :range="[-50,50]" :showLabel="true" :showRangeTxt="true"></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val4}}</span>
          </cell>
        </div>
        <h4>设置分段数（stage=20）</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider
                v-model="val5"
                :range="[0,100]"
                :showLabel="true"
                :showRangeTxt="true"
                :stage="5"
              ></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val5}}</span>
          </cell>
        </div>
        <h4>自定义Class</h4>
        <div>
          <cell>
            <span slot="title">
              <itv-slider class="my-slider" v-model="val6" :range="[0,100]"></itv-slider>
            </span>
          </cell>
          <cell>
            <span slot="title">Value： {{val6}}</span>
          </cell>
        </div>
    </itv-main>

</itv-container>
</template>

<script>
export default {
  data() {
    return {
      val1: 0,
      val2: 10,
      val3: 50,
      val4: 0,
      val5: 0,
      val6: 0
    };
  },
  methods: {}
};
</script>

<style lang="less">
  .cell:first-child {
    .cell-title {
      padding: 0 30px;
    }
  }

.itv-slider.my-slider {
  .itv-slider-box {
    height: 6px;
    border-radius: 3px;
    background-color: #b6b6b6;
  }
  .itv-slider-Handle {
    border-width: 0;
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    transition: none;
    &.itv-slider-ani {
      border-width: 0;
      box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>

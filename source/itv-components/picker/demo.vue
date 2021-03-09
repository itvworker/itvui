<template>
  <itv-container>
      <itv-header>Picker</itv-header>
      <itv-main>
      <picker
        :is-visible="isVisible0"
        :list-data="listData0"
        title="请选择年月"
        :default-value-data="defaultValueData0"
        @close="switchPicker('isVisible0')"
        @confirm="setChooseValue0"
        @choose="choose"
        isLoop
      ></picker>
      <!-- demo 城市选择(联动)-->
     
  </itv-main>
  </itv-container>

</template>

<script>

const APIData = [
  {
    label: 1,
    array: [
      {
        label: 3,
        value: "朝阳区"
      },
      {
        label: 4,
        value: "海淀区"
      }
    ]
  },
  {
    label: 2,
    array: [
      {
        label: 5,
        value: "测试1"
      },
      {
        label: 6,
        value: "测试2"
      },
      {
        label: 7,
        value: "测试2"
      }
    ]
  }
];
export default {
  data() {
    return {
      date: null,
      isVisible0: true,
      listData0: [
        [
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          
        ],
        ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
      ],
      defaultValueData0: ["2010", "2"],
     
    };
  },
  created() {
   
  },
  methods: {
      choose(value,index) {
          console.log(index);
      }
  }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
.btn,.show-value {
  display: inline-block;
  margin-left: 20px;
}
.btn {
  padding: 5px;
  border-radius: @itv-btn-border-radius-small;
  color: #fff;
  background-color: #999;
}
</style>

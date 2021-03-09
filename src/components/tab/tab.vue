<template>
    <div @click="$emit('click')" :class="['itv-cell',{'itv-cell-link':isLink}]"  :style="{'background-color':bgColor}">
        <div class="itv-cell-box">
            <div class="itv-cell-left">
            <span class="itv-cell-title"><slot name="title">{{title}}</slot></span>
            <span class="itv-cell-sub-title"><slot name="sub-title">{{subTitle}}</slot></span>
        </div>
            <div class="itv-cell-right">
                <span class="itv-cell-desc"><slot name="desc">{{desc}}</slot></span>
                <span class="itv-cell-icon"><slot name="icon" v-if="showIcon"><img src="data:image/svg+xml,%3Csvg viewBox='0 0 5 10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.215 9.757l3.577-4.17a.931.931 0 0 0 0-1.173L1.215.244a.642.642 0 0 0-1.007 0 .929.929 0 0 0 0 1.172L3.283 5 .208 8.584a.93.93 0 0 0 0 1.173.643.643 0 0 0 1.007 0z' fill='rgb(200,200,205)'/%3E%3C/svg%3E" alt=""></slot></span>
            </div>
        </div>
    </div>
</template>
<script>
import Swpier from 'swiper';


export default {
  name: "swpier-tab",
  props: {
    title: {
      type: String,
      default: ""
    },
    subTitle: {
      type: String,
      default: ""
    },
    desc: {
      type: String,
      default: ""
    },
    isLink: {
      type: Boolean,
      default: false
    },
    linkUrl: {
      type: String,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    bgColor: {
      type: String,
      default: "#FFFFFF"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

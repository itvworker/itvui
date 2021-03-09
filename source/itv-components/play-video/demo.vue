<template>
  <itv-container>
        <itv-header>playVideo</itv-header>
        <itv-main>
            <play-video :videos="videos" class="box-video" ref="center" width="" />
        </itv-main>
  </itv-container>
</template>

<script>

let arr =[
    {

        url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
        name:"3D动画兔子"
    },
    {
        url:"http://www.w3school.com.cn/example/html5/mov_bbb.mp4",
        name:"3D动画兔子2"
    },
    {
      url:"http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
      name:"3D动画兔子2"
    },{
      url:"http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4",
      name:"大电影"
    }
]
export default {
  data() {
    return {
      videos:arr
     
    };
  },
  created() {
   
  },
  methods: {
      choose(value,index) {
          console.log(index);
      }
  },
  mounted() {

      this.$refs.center.skipChapter(0)
  }
};
</script>
<style lang="less" scoped>
.box-video{
  height: 212ipx;
}
</style>

<template lang="html">
    <itv-container>
        <itv-header>Cliper</itv-header>
        <itv-main>
          <div class="section-box">
            <img :src="url" :onerror="defaultImg" />
          </div>

            <div class="itv-demo-btn btn-content" >
                方形截剪
                <input type="file" class="select-pic" accept="image/*" @change="open($event,'square')">
            </div>
            <div class="itv-demo-btn btn-content">
              <input type="file" class="select-pic" accept="image/*" @change="open($event,'circle')">
                圆形
            </div>

            <div class="flex-rows-box">
                <div class="rows-item">
                  <span>宽度：</span>
                    <input class="input-text" type="number" v-model="width" />
                </div>
                <div class="rows-item">
                  <span>高度：</span>
                    <input class="input-text" type="number" v-model="height" />
                </div>
                <div class="rows-item itv-demo-btn">
                  <input type="file" class="select-pic" accept="image/*" @change="open($event,'orthogon')">
                    自定义
                </div>
            </div>
            <input type="">

        </itv-main>
        <transition name="itv-slide-top">
            <itv-container class="cliper-main-box" v-show="toggle">
                <itv-header :showArrow="false">
                  <div class="btn-close" @click="toggle=false">关闭</div>
                  Cliper截图
                </itv-header>
                <itv-main>
                    <itv-cliper :width="w" :height="h" ref="cliper" :clipType="clipType"></itv-cliper>
                </itv-main>
                <itv-flex-row>
                    <div class="item" @click="reset">重置</div>
                    <div class="item">
                        选择图片
                        <input class="select-img" @change="open"  type="file" />
                    </div>
                    <div class="item" @click="done">
                        确认
                    </div>
                </itv-flex-row>
            </itv-container>
        </transition>
    </itv-container>

</template>

<script>

import ItvCliper from './cliper.vue'
import img from '@/assets/img/header.jpeg';
export default {
    components: {
        ItvCliper
    },
    data() {
        return {
            clipType: 'orthogon',
            url:'',
            w:100,
            h:200,
            width: 100,
            height:300,
            toggle: false
        }
      },

    computed: {
        defaultImg () {
            return 'this.src="'+ img +'"'
        }
    },
    methods: {
        reset() {
            this.$refs.cliper.reset()
        },
        openToggle(event) {
            this.toggle = true;
        },
        open(event, type) {
            this.toggle = true;
            if(type)this.clipType = type;
            if(type==="orthogon") {
              this.w = parseInt(this.width);
              this.h = parseInt(this.height);
            }else{
              this.w =200
              this.h =200
            }

            var files = event.target.files || event.dataTransfer.files
            var reader = new FileReader()
            reader.readAsDataURL(files[0])
            reader.onload = e => {
                this.$refs.cliper.insertImage(e.target.result);
            }
        },
        done() {
            let result = this.$refs.cliper.done();
            this.url = result;
            this.toggle = false;

        }
    }
}
</script>

<style lang="less">
   @import 'cliper.less';
   .section-box {
     height: 120ipx;
     margin: 20ipx 0px;
     text-align: center;
     img {
       max-width: 100%;
       max-height: 100%;
     }
   }
   .input-text{
      width: 50px;
      background-color: #eee;
      padding: 10ipx;
      border-radius: 2ipx;
   }
   .btn-content{
      margin: 10ipx;
      position: relative;
   }
   .flex-rows-box {
     padding: 10ipx;
     .rows-item{
       display: flex;align-items: center;
       position: relative;
     }
   }
   .btn-close{
     position: absolute;
     right: 0px;
     height: 44ipx;
     line-height: 44ipx;
     padding: 0px 10ipx;
     font-size: 14ipx;
   }
   .cliper-main-box {
     position: absolute;
     left: 0px;
     right: 0px;
     bottom: 0px;
     top: 0px;
   }
   .item {
       text-align: center;
       line-height: 44ipx;
       font-size: 16ipx;
       position: relative;
       height: 100%;
       overflow: hidden;
       .select-img{
           position: absolute;
           left: 0px;
           right: 0px;
           height: 100%;
           opacity: 0;
       }
   }
   .select-pic {
     position: absolute;
     width: 100%;
     height: 100%;
     opacity: 0;

   }
</style>

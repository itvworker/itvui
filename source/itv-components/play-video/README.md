# Message


### 安装

#### 全局引入(非标签模式)
```javascript
import vue from 'vue';
import video  from 'vukVideo';

vue.use(video);

//设置视频内容
this.$vuk.video.setVideos([
    {
        name: '视频标题一',
        url: 'http://www.itvwork.com/2018/12/07/6bcbca7d3d29e7c51224a38690f92322.mp4',
        backup: 'http://www.itvwork.com/2018/12/07/6bcbca7d3d29e7c51224a38690f92322.mp4'//备份url,出错时使用此地址
    },
    {
        name: '视频标题二',
        url: 'http://www.itvwork/2018/12/07/6bcbca7d3d29e7c51224a38690f92322.mp4'
    }
])


//打开视频并播放
this.$vuk.video.openPlay({
    index:1, //播放哪一个视频，从0开始，设置视频请使用this.$vuk.video.setCourse
    duration: 0, //跳转的秒数，跳转到哪一秒
    cordova: true, //
    quit:(res)=>{  //当退出视频时调用的回调
    },
    end: (res) =>{ //当视频播放结束时调用的回调
        console.log(res);
    },
    play: (res)=>{ //当视频播时调用

    },
    pasue: (res) => { //当视频被暂停时调用

    },
    screen: (res) => {

    }
});

//视频插件是不是处在打开的状态
this.$vuk.video.isOpen()

//视频插件是不是处在打开的状态
this.$vuk.video.isOpen()

//获取当视频播放的秒数
this.$vuk.video.currentTime()

//视频插件是不是处在打开的状态
this.$vuk.video.setLang('en')//目前支持zh,en


this.$vuk.video.close() //关闭插件

```

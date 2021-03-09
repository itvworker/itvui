
<template lang="html">
<!-- :style="{'transform':`rotate(${rotate}deg)`,'width':innerWidth+'px', 'height':innerHeight+'px','z-index':zIndex}" -->
    <section class="itv-play-video" ref="video"    >
        <div class="itv-play-video-indoor" >
            <div class="error-message"  v-if="isLoading && videoStatus===1" @click="reload">{{lang[langType].netWorkError}}</div>
            <div class="error-message" v-if="videoStatus===2">{{lang[langType].typeError}}</div>
            <!-- v-if="videoStatus===2 || (isLoading && videoStatus===1)" -->
            <div class="itv-play-video-title-bar vuk-viedo-show" v-if="videoStatus===2 || (isLoading && videoStatus===1)">
                <div class="itv-play-video-iconfont-back" @click="closeVideo"></div><div class="itv-play-video-title-word">{{videos.length>0 ?videos[nowPlayIndex]['name']:''}}</div>
            </div>
            <div class="itv-play-video-title-bar" v-else :class="{'iphonex-bar': screenDir !== 'vertical','vuk-viedo-show':isShowNav && !isSelectShow}">
                <div class="itv-play-video-iconfont-back" @click="closeVideo"></div><div class="itv-play-video-title-word">{{videos.length>0 ?videos[nowPlayIndex]['name']:''}}</div>
            </div>
            <img alt  class="cover" v-if="cover" :src="cover"  />
            <video  webkit-playsinline="webkit-playsinline" playsinline="playsinline"  
            @loadstart="loadstart" 
            @canplay="canplay($event,'canplay')" 
            class="video-view-libs"
            :src="url" 
            @loadedmetadata="canplay($event,'loadedmetadata')" 
            @waiting="canplay($event,'waiting')"   
            @volumechange="setVolume"  
            @error="error" 
            @ended="endNow" 
            @pause="isPause=true" 
            @timeupdate="changePropessed" 
            @play="eventPlay" 
            ref="videoCenter" autoplay>
            
            </video>

            <!-- <video   class="video-view-libs ios-video" webkit-playsinline="webkit-playsinline" playsinline="playsinline"
            :style="{opacity: nowPlayIndex ===index?1:0 }"
             ref="iosVideo" v-if="isIos" v-for="(item, index) in videos" :src="item.url"
             :key="index"
            @playing="iosPlay(index)"
            @loadstart="iosLoadstart"
            @volumechange="setVolume"  @error="iosError($event,index)"
            @ended="iosEndNow(index)" @pause="iosIsPause(index)"

            @timeupdate="changePropessed(index)"
            @play="iosEventPlay(index)"
            @waiting="iosWaiting(index, true)"
            @canplay="iosLoading(index, false)"
            @canplaythrough="iosLoading(index, false)"
            @loadedmetadata="iosLoading(index, false)"
            @progress="videoProgress"
                >
            </video> -->
            <!-- 滑动条 -->
            <section class="touch-screen" @touchstart="screenTouchstart" @touchmove="screenTouchmove" @touchend="screenTouchend" ref="screen" @click = "toggleNav">

                <div class="itv-play-video-time-bar" v-show="screenType==='progress' && allTime!=='00:00'">
                    {{forBackTime}}/{{allTime}}
                </div>

                <!-- <span class="itv-play-video-time-bar" >
                    {{forBackTime}}/{{allTime}}
                </span> -->


                <load-icon v-if="isLoading && !videoStatus"></load-icon>
                <div class="itv-play-video-volume-brightness" v-show="screenType==='sound'">
                    <em class="itv-play-video-iconfont-volume" ></em> 
                    <div class="itv-play-video-measure-bar-out">
                        <div class="itv-play-video-measure-bar" :style="{width:volume*100+'%'}"></div>
                    </div>
                </div>
            </section>
            <section class="touch-watermark">
               
                <div class="text" v-for="item in watchMarks">
                    {{item}}
                </div>
            </section>
            <div class="oper-bar" :class="{'iphonex-bar': isIphonx ||  screenDir !== 'vertical', 'vuk-viedo-show':isShowNav && !isSelectShow}" @touchstart="clearTime" @touchend="addTime" >

                <div class="progress-outline" ref="progress" @touchend="endProgessBar($event, 'start')"  @touchmove="barTouchstart($event, 'move')" @touchstart="strartProgessBar($event,'start')">
                    <div class="progress-bar">
                        <div class="progressed" :style="{width:propessed+'%'}" >

                        </div>
                        <!-- <div class="input-content">
                            <div class="progressed" style="width:100%" :style="{transform:'translateX('+px+'px)'}" >

                            </div>
                        </div> -->

                        <div class="big-pot" :style="{transform:'translateX('+px+'px)'}">
                            <div class="lit-pot">

                            </div>
                        </div>
                    </div>
                </div>
                <div class="click-bar-left">
                    <div class="itv-play-video-iconfont play-pause" @click.stop="toggle" :class="{'itv-play-video-play-icon': isPause,'itv-play-video-pause-icon': !isPause,}"></div>
                    <div class="itv-play-video-iconfont play-next itv-play-video-next" v-if="videos.length>1 && nowPlayIndex!==videos.length-1 && !single" @click.stop="next"></div>
                    <div class="itv-play-video-time-bar">
                        {{currentTime}}/{{allTime}}
                    </div>
                </div>

                <div class="click-bar-right">
                    <div class="itv-play-video-iconfont moblie-icon" :class="screenDir" @click="$emit('screen',screenDir)" v-if="screenDir"></div>
                    <div class="itv-play-video-btn-word" @click="isSelectShow=true;selectType='speed'">{{selectSpeed}}</div>
                    <div class="itv-play-video-btn-word" @click="isSelectShow=true;selectType='chapter'" v-if="videos.length>=2 &&!single">章节</div>
                </div>
            </div>

            <div class="vuk-viedo-select-chapter" :class="{'vuk-viedo-show': isSelectShow}">
                <div class="itv-play-video-select-chapter-title">
                    <span v-if="selectType==='chapter'">{{lang[langType].chapter}}</span>
                    <span v-else>{{lang[langType].speed}}</span>
                </div>
                <div class="itv-play-video-chapter-scroller">
                    <ul v-if="selectType==='chapter'"  :class="{'itv-play-video-select-dot':chapterFormat==='dot','itv-play-video-select-list':chapterFormat==='list'}">
                        <li v-for="(item,index) in videos" @click="skipChapter(index)" :class="{'active':nowPlayIndex===index}">
                            <span>{{index+1}}</span>
                            <span class="itv-play-video-chapter-name">
                                {{item.name}}
                            </span>
                        </li>
                    </ul>
                    <ul class="itv-play-video-play-speed" v-if="selectType==='speed'">
                        <li :class="{'active': selectSpeed==='0.8X'}" @click="setPlaySpeed(0.8)">0.8X</li>
                        <li :class="{'active': selectSpeed==='1.0X'}"  @click="setPlaySpeed(1.0)">1.0X</li>
                        <li :class="{'active': selectSpeed==='1.25X'}" @click="setPlaySpeed(1.25)">1.25X</li>
                        <li :class="{'active': selectSpeed==='1.5X'}" @click="setPlaySpeed(1.5)">1.5X</li>
                        <li :class="{'active': selectSpeed==='2.0X'}" @click="setPlaySpeed(1.8)">2.0X</li>
                    </ul>
                </div>
            </div>
            <div class="vuk-viedo-select-chapter-bg" v-show="isSelectShow" @click="closeSlectBox"></div>
        </div>
    </section>
</template>

<script type="es6">
import slide from "./mixins/slide";
import common from "./mixins/common";
import slideBar from "./mixins/slideBar";
import control from "./mixins/control";
import loadIcon from "./components/loading.vue";
import ios from "./mixins/ios";
export default {
    name: "play-video",
    mixins: [slide, common, slideBar, control, ios],
    components: {
        loadIcon
    },
    computed: {
        watchMarks() {
           
            let arr = [];
            for(let i = 0; i < 3000; i++) {
                arr.push(this.watchMarkText)
            }
            return arr;
        },
        innerWidth() {
            if(!this.isFullScreen) return null;
            if(this.rotate===90 || this.rotate === 270) {
                return window.screen.height;
            }else{
                return window.screen.width;
            }
            
        },
        innerHeight() {
            if(!this.isFullScreen) return null;
            if(this.rotate===90 || this.rotate === 270) {
                return window.screen.width
            }else{
                return window.screen.height;
            }
        },
        marginLeft() {
            if(!this.isFullScreen) return null;
            if(this.rotate===90 || this.rotate === 270) {
                return -window.screen.height/2+'px';
            }else{
                return null
            }
        },
        marginTop() {
            if(!this.isFullScreen) return null;
            if(this.rotate===90 || this.rotate === 270) {
                return -window.screen.width/2+'px';
            }else{
                return null;
            }
        },
        videoPostion() {
            if(this.rotate===90 || this.rotate === 270) {
                return '50%';
            }
            return null;
        },
        
    },
    props: {
        videos: {
            type: Array,
            default: () => {
                return [];
            }
        },
        watchMarkText: {
            type: String,
            default: 'text'
        },
        duration: {
            //跳转秒数秒
            type: Number,
            default: 0
        },
        value: {
            type: Number,
            default: 0
        },
        chapterFormat: {
            type: String,
            default: "list"
        },
        isShow: {
            type: Boolean,
            default: false
        },
        
        zIndex: {
            type: Number,
            default: 999
        },
        single: {
            //是否为单片模模式(只播放一个视频)
            type: Boolean,
            default: false
        },
        
        lang: {
            type: Object,
            default: () => {
                return {
                    zh: {
                        speed: "倍速",
                        chapter: "章节",
                        netWorkError: "网络开小差了，点击刷新",
                        typeError: "不支持该播放格式或文件已损坏"
                    },
                    en: {
                        speed: "speed",
                        chapter: "chapter",
                        netWorkError: "Network error, click refresh",
                        typeError:
                            "This format is not supported or the file is corrupted"
                    }
                };
            }
        },
        
        screenDir: {
            type: String,
            default: "vertical"
        },
        langType: {
            type: String,
            default: "zh"
        },
        rotate:{
            type: Number,
            default: 0
        },
        
    },
    watch: {
        url(news, olds) {
            this.selectSpeed = this.lang[this.langType].speed;
        },
        isShow(val, old) {
            if (val === false) {
                this.propessed = 0;
                this.px = 0;
            } else {
                this.setPlaySpeed(1.0);
                this.selectSpeed = this.lang[this.langType].speed;
            }
        }
    },
    data() {
        return {
            url: "",
            nowPlayIndex: this.value ? this.value : 0, //当前播放的章节
            cover: "",
            target: "",
            currentTime: "00:00", //当前时间
            allTime: "00:00", //总时间
            forBackTime: "00:00", //快进后退时间
            start: 0,
            move: 0,
            end: 0,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            y: 0,
            isMove: false,
            type: false,
            propessed: 0,
            screenType: false,
            isIos: false, //是否为ios,
            isIphonx: false,
            isFullScreen: false
        };
    },

   

    methods: {
        iosPhone() {
            this.isIphonx =
                navigator.userAgent.indexOf("iPhone") > -1 &&
                window.screen.height >= 812 &&
                window.devicePixelRatio >= 2;
        },
        setVideoStyle() {
            let dom = this.$refs.video;
            dom.style.webkitTransform = `rotate(${this.rotate}deg)`;
            dom.style.width=`${this.innerWidth}px`
            dom.style.height=`${this.innerHeight}px`
            dom.style.zIndex = this.zIndex
            dom.style.left = this.videoPostion;
            dom.style.top = this.videoPostion;
            dom.style.marginLeft = this.marginLeft;
            dom.style.marginTop = this.marginTop;
           
        }
    },

    mounted() {
        this.target = this.$refs.videoCenter;
        this.target.controls = false;
        this.setVideoStyle();

         var el = document.documentElement;
            var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
                if(typeof rfs != "undefined" && rfs) {
                    rfs.call(el);
                };
    }
};
</script>
<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-play-video.less';
</style>





<!-- 事件类型：

touchstart : 触摸开始（手指放在触摸屏上）

touchmove : 拖动（手指在触摸屏上移动）

touchend : 触摸结束（手指从触摸屏上移开）

touchenter ：移动的手指进入一个dom元素。

touchleave ：移动的手指离开一个dom元素。

还有一个touchcancel，是在拖动中断时候触发。

事件属性：

altKey : 该属性返回一个布尔值，表示在指定的事件发生时，Alt 键是否处于按下状态， event.altKey=true|false|1|0

type : 触摸时触发的事件类型，比如touchstart

每个触摸事件都包括了三个触摸属性列表：

1. touches：当前位于屏幕上的所有手指触摸点的一个列表。

2. targetTouches：当前元素对象上所有触摸点的列表。

3. changedTouches：涉及当前事件的触摸点的列表。

它们都是一个数组，每个元素代表一个触摸点。

每个触摸点对应的Touch都有三对重要的属性，clientX/clientY、pageX/pageY、screenX/screenY。

其中screenX/screenY代表事件发生的位置对于屏幕的偏移量，clientX/clienYt和pageX/pageY都代表事件发生位置对应对象的偏移量，不过区别是clientX/clientY不包括对象滚动而隐藏的偏移量，而pageX/pageY包括对象滚动而隐藏的偏移量。移开屏幕的那个触摸点，只会包含在changedTouches列表中，而不会包含在touches 和targetTouches 列表中， 所以changedTouches在项目当中会比较常用。 -->

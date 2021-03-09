export default {
    data() {
        return {
            isPause: true, //是否暂停中
            isSelectShow: false, //选择框显示
            selectType: '',
            isShowNav: true, //是否显示操作菜单
            closeTime: '', //关闭时间器
            selectSpeed: '倍速',
            volume: '', //音量
            isLoading: false,
            timeOut: '',
            online: true,
            videoStatus: 0, //视频所处理状态 1为断网,2为未找到视频
        }
    },
    mounted() {
        //DOMException
    },
    methods: {
        updateOnlineStatus(e) {
            this.online = false
        },
        reload() {
            let sec = this.target.currentTime
            this.target.load()
            this.play()
            this.setVideoCurrentTime(sec)
        },
        play() {
            if (this.error()) {
                return
            }
            this.$refs.videoCenter.play();
        },
        eventPlay() {
            this.isPause = false
            this.clearTime()
            this.addTime()
            this.isLoading = false
        },
        loadstart() {
            this.isLoading = true
        },

        closeVideo() {
            this.$emit('close', {
                currentTime: this.target.currentTime,
                duration: this.target.duration,
            })
            this.isShow = false
            this.target.pause()
            this.propessed = 0
        },
        toggle() {
            if (this.target.paused) {
                this.play()
            } else {
                this.target.pause()
            }
        },
        setPlaySpeed(value) {
            if (value === 1 || value === 2) {
                this.selectSpeed = value + '.0X'
            } else {
                if (value === 1.8) {
                    this.selectSpeed = '2.0X'
                } else {
                    this.selectSpeed = value + 'X'
                }
            }
            if (this.target) {
                this.target.playbackRate = value
            }
        },
        addTime() {
            this.closeTime = setTimeout(() => {
                this.isShowNav = false
            }, 4000)
        },
        closeSlectBox() {
            this.isSelectShow = false
            this.isShowNav = true
            this.clearTime()
            this.addTime()
        },
        clearTime() {
            if (this.closeTime) {
                clearTimeout(this.closeTime)
            }
        },
        toggleNav() {
            this.isShowNav = !this.isShowNav
            if (this.isShowNav) {
                this.clearTime()
                this.addTime()
            }
        },
        setVolume() {
            this.volume = this.target.volume
        },
        //更新时间
        changePropessed(e) {
            this.isLoading = false
            this.videoStatus = 0
            if (this.isProgessMove) return
            this.propessed = (this.target.currentTime / this.target.duration) * 100
            this.decPx(this.propessed / 100)
            this.calcTime(this.target.currentTime, this.target.duration)
        },
        //跳转当前播放进度
        setVideoCurrentTime(value) {
            if (typeof value === 'number') {
                this.target.currentTime = value
                return
            }
            this.target.currentTime = (this.propessed / 100) * this.target.duration
            this.decPx(this.propessed / 100)
        },
        //播放结束时
        endNow() {
            if (this.nowPlayIndex >= this.videos.length - 1) {
                return
            }
            ++this.nowPlayIndex
            this.url = this.videos[this.nowPlayIndex]['url']
        },
        //跳转集数
        skipChapter(index) {
           
            this.nowPlayIndex = index
            this.url = this.videos[this.nowPlayIndex]['url']
            setTimeout(()=>{
                this.play()
            },300)
            
            
           
        },
        next() {
            this.nowPlayIndex++
            this.play()
            this.setVideoCurrentTime(0)
        },
        //跳转集数并跳转到指定的播放时间
        skipChapters(index, doc) {
            this.nowPlayIndex = index
            this.url = this.videos[this.nowPlayIndex]['url']
            this.setVideoCurrentTime(this.duration)
            this.play()
        },
        error() {
            setTimeout(() => {
                this.errors()
            }, 300)
        },

        //处理错误
        errors(e) {
            let code = this.target.networkState
            // 0 = NETWORK_EMPTY - 音频/视频尚未初始化
            // 1 = NETWORK_IDLE - 音频/视频是活动的且已选取资源，但并未使用网络
            // 2 = NETWORK_LOADING - 浏览器正在下载数据
            // 3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
            this.videoStatus = 0
            if (code === 1 && !navigator.onLine) {
                this.videoStatus = 1
                return
            }
            if (code === 2 && !navigator.onLine) {
                this.videoStatus = 1
                return
            }
            if (code === 3) {
                this.videoStatus = 2
                return
            }

            if (!this.target.error) {
                return
            }
            switch (this.target.error.code) {
                case 1:
                    break
                case 2:
                    break
                case 3:
                    break
                case 4:
                    this.videoStatus = 3
                    break
            }
            this.isLoading = false
        },
        //当时视可以播放时
        canplay(e, type) {
            this.volume = this.target.volume
            this.calcTime(this.target.currentTime, this.target.duration)
            this.play()
            // this.loadPlay()
        },

        //跳转
        skipTimePoint(value) {
            let arr = value.split(':')
            let time = parseInt(arr[0]) + parseInt(arr[1])
            this.target.currentTime = time
        },
    },
}

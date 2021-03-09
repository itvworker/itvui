export default {
    watch: {
        nowPlayIndex(value, old) {
            if (this.isIos) {
                this.$refs.iosVideo[old].pause()
            }
        },
    },
    methods: {
        loadingVideo(e, index) {
            if (index === this.nowPlayIndex) {
                this.isLoading = true
            }
        },
        iosWaiting(index, show) {
            if (index === this.nowPlayIndex) {
                this.error(true)
                this.isLoading = show
                this.$emit('pause', {
                    currentTime: this.target.currentTime,
                    duration: this.target.duration,
                })
            }
        },
        videoProgress() {},
        iosLoading(index, show) {
            if (index === this.nowPlayIndex) {
                this.isLoading = show
            }
        },
        iosPlay(index) {
            if (index === this.nowPlayIndex) {
                this.$emit('play', {
                    currentTime: this.target.currentTime,
                    duration: this.target.duration,
                })
            }
        },
        iosLoadstart(index) {
            if (index === this.nowPlayIndex) {
                this.loadstart()
            }
        },
        iosError(e, index) {
            if (this.videos[index].backup && e.target.src !== this.videos[index].backup) {
                e.target.src = this.videos[index].backup
                setTimeout(()=>{
                    this.play()
                },500)
                return  
            }
            if (index === this.nowPlayIndex) {
                this.error(e)
            }
        },
        iosEndNow(index) {
            this.$emit('end', {
                currentTime: this.target.currentTime,
                duration: this.target.duration,
            })

            if (this.single) return
            if (index === this.nowPlayIndex) {
                if (this.nowPlayIndex >= this.videos.length - 1) {
                    return
                }
                this.nowPlayIndex++
                this.target = this.$refs.iosVideo[this.nowPlayIndex]
                this.play()
            }
        },

        iosIsPause(index) {
            if (index === this.nowPlayIndex) {
                this.isPause = true
                this.$emit('pause', {
                    currentTime: this.target.currentTime,
                    duration: this.target.duration,
                })
            }
        },
        iosChangePropessed(index) {
            if (index === this.nowPlayIndex) {
                this.changePropessed()
            }
        },
        iosEventPlay(index) {
            if (index === this.nowPlayIndex) {
                this.eventPlay()
                this.isLoading = false
            }
        },
        iosTarget(index, duration = 0) {
            this.nowPlayIndex = index
            this.target = this.$refs.iosVideo[index]
            this.play()
            this.setVideoCurrentTime(duration)
        },
        iosNext() {
            this.nowPlayIndex++
            this.target = this.$refs.iosVideo[this.nowPlayIndex]
            this.play()
            this.setVideoCurrentTime(0)
        },
        iosSkipChapter(index) {
            this.nowPlayIndex = index
            this.target = this.$refs.iosVideo[index]
            this.play()
            if (this.selectSpeed && parseFloat(this.selectSpeed)) {
                this.setPlaySpeed(parseFloat(this.selectSpeed))
            }
        },
    },
}

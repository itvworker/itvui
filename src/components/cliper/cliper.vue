<template lang="html">
    <div class="itv-cliper"  ref="clipic" @mouseup="touchend" @mouseleave="touchend"  @mousedown="touchstart" @touchmove="touchmove"  @mousemove="touchmove" @touchend="touchend" v-show="toggle" >
        <div class="itv-cliper-clipic-frame" :class="{'itv-cliper-circle':clipType==='circle'}"  :style="{width:frame1Width+'px', height:frame1Height+'px'}" ref="frame1" id="clipicFrame1">
            <img :style="{width: imgWidth+'px',height: imgHeight+'px',transform:'translate('+translateX+'px, '+translateY+'px) scale('+scale+') rotate('+rotate+'deg)'}"
             :src="src" /></div>
        <div class="itv-cliper-clipic-layer"></div>
        <div class="itv-cliper-clipic-frame itv-cliper-clipic-frame-show" :class="{'itv-cliper-circle':clipType==='circle'}"
          :style="{width:frame2Width+'px', height:frame2Height+'px'}"
          ref="frame2"  >
          <img ref="img2"
          :style="{width: imgWidth+'px',height: imgHeight+'px',transform:'translate('+translateX+'px, '+translateY+'px) scale('+scale+') rotate('+rotate+'deg)'}"   :src="src" /></div>

    </div>
</template>

<script>

export default {
    name: 'itv-cliper',
    props: {
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        },
        styles: {
            type: Object,
            default:()=>{
                return {
                    title: '移动或缩放',
                    cancelText:'取消',
                    confirmText: '确定',
                    titleTextColor: '#fff',
                    cancelTextColor:'#fff',
                    confirmTextColor: '#fff',
                    headerBgColor: '#314558',
                    cancalBtnColor: '#314558',
                    confirmBtnColor: '#919CA3'
                }
            }
        },

        outputFormat: {
            type: String,
            default: 'png'
        },
        quality: {
            type: Number,
            default: 1
        },
        clipType: {
            type: String,
            default: 'orthogon' //square circle orthogon
        }
    },
    data() {
        return {
            scale: 1,
            rotate: 0,
            translateX: 0,
            translateY: 0,
            distance: null,
            ratio: 1,
            toggle: true,
            originRatio:0,
            angle: 0,
            moveX: 0,
            moveY: 0,
            frame1Width: 0,
            frame1Height: 0,
            frame2Width: 0,
            frame2Height: 0,
            imgWidth: null,
            imgHeight: null,
            initVal: {
                scale: 1,
                rotate: 0,
                translateX: 0,
                translateY: 0,
            },
            supportTouch: true,
            press: false,
            src: ''
        }
    },

    computed: {


    },

    methods: {
        insertImage(url) {
        // 初始化参数
            this.scale = 1 // 缩放
            this.rotate = 0 // 旋转
            this.translateX = 0 // 水平偏移
            this.translateY = 0 // 垂直偏移
            this.toggle = true;
            let tempImage = new Image()
            tempImage.src = url;
            this.src = url;

            tempImage.onload = () => {
                this.originW = tempImage.width
                this.originH = tempImage.height
                this.originRatio = this.originW / this.originH
                this.ratio = this.width / this.height
                this.initSize()
                if (this.ratio > this.originRatio) {

                    this.imgWidth = this.frame2Width;
                    this.imgHeight = this.frame2Width/this.originRatio;
                    this.translateY = -(this.frame2Width/this.originRatio-this.frame2Height)/2
                    this.initVal.translateY = this.translateY;
                    this.initVal.translateX = 0;
                } else {

                    this.imgHeight = this.frame2Height;
                    this.imgWidth =  this.frame2Height*this.originRatio;
                    this.translateX = -(this.frame2Height*this.originRatio-this.frame2Width)/2
                    this.initVal.translateX = this.translateX;
                    this.initVal.translateY = 0

                }
            }




        },
        touchend(e) {
            console.log(e);
            this.distance = null
            this.angle = null
            this.moveX = null
            this.moveY = null
            this.press = false;
        },
        touchstart() {

            this.press = true;
        },
        handleScroll(e) {
            if(e.wheelDelta>0) {
                 this.scale += 0.1;
            }else{
                 this.scale -= 0.1;
            }
        },
        touchmove(e) {
            if(e.type === 'mousemove'){
                if(this.press){
                    this.setTranslate(e)
                }
                return
            }
            e.preventDefault()
            if (e.touches.length > 1) {
                this.setScale(e.touches[0], e.touches[1])
                this.setRotate(e.touches[0], e.touches[1])
                return
            }
            this.setTranslate(e.touches[0])
        },

        setScale(touches1, touches2) {
            const x = Math.abs(touches1.clientX - touches2.clientX)
            const y = Math.abs(touches1.clientY - touches2.clientY)
            const s = Math.sqrt(x * x + y * y)
            if (this.distance) {
                this.scale += (s - this.distance) / this.$refs.img2.clientWidth
            }
            this.distance = s
        },
        setRotate(touches1, touches2) {
            const x = touches1.clientX - touches2.clientX
            const y = touches1.clientY - touches2.clientY
            const s = Math.sqrt(x * x + y * y)
            const angle = (Math.atan2(y, x) * 180) / Math.PI
            if (this.angle) {
                this.rotate += angle - this.angle
            }
            this.angle = angle
        },
        setTranslate(touches) {
            const x = touches.clientX
            const y = touches.clientY
            if (this.moveX) {
                this.translateX += x - this.moveX
            }
            if (this.moveY) {
                this.translateY += y - this.moveY
            }
            this.moveX = x
            this.moveY = y
        },
        initSize() {

            const body = document.documentElement || document.body

            let cw = this.$refs.clipic.clientWidth-60;

            // if(this.clipType !== 'orthogon') {
            //     cw = cw - 60
            // }
            // cw = cw - 60


            const ch = this.$refs.clipic.clientHeight-60;
            this.frame1Width = cw
            this.frame1Height = cw / this.ratio
            this.frame2Width = cw
            this.frame2Height = cw / this.ratio



            if (cw / this.ratio > ch) {
                this.frame1Height = ch
                this.frame1Width = ch * this.ratio
                this.frame2Height = ch
                this.frame2Width = ch * this.ratio
            }
        },
        reset() {
            this.scale = 1
            this.rotate = 0
            this.translateX = this.initVal.translateX;
            this.translateY = this.initVal.translateY;
        },
        cancel() {
            this.toggle =  false;
            if (this.onCancel) {
                this.onCancel()
            }
        },
        done() {
            const zommRatio = this.width / this.frame2Width
            const canvas = document.createElement('canvas')
            canvas.width = this.width
            canvas.height = this.height
            const ctx = canvas.getContext('2d')
             ctx.fillStyle = '#fff'
             if(this.outputFormat === 'png'){
                 ctx.fillStyle = 'rgba(0,0,0,0)'
             }

            ctx.fillRect(0, 0, canvas.width, canvas.height)
            if(this.clipType === 'circle'){
                ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,2*Math.PI);
                ctx.clip()
            }


            let drawImageW
            let drawImageH
            if (this.ratio > this.originRatio) {
                drawImageW = this.width
                drawImageH = this.originH / (this.originW / this.width)
            } else {
                drawImageH = this.height
                drawImageW = this.originW / (this.originH / this.height)
            }
            const point = { x: drawImageW / 2, y: drawImageH / 2 }
            ctx.translate(this.translateX * zommRatio, this.translateY * zommRatio)
            if (this.rotate !== 0) {
                ctx.translate(point.x, point.y)
                ctx.rotate((this.rotate * Math.PI) / 180)
                ctx.translate(-point.x, -point.y)
            }
            if (this.scale !== 1) {
                ctx.translate(point.x * (1 - this.scale), point.y * (1 - this.scale))
                ctx.scale(this.scale, this.scale)
            }
            ctx.drawImage(this.$refs.img2, 0, 0, drawImageW, drawImageH)
            let result = canvas.toDataURL(`image/${this.outputFormat}`, this.quality)
            this.$emit('output', result);
            return result

        }

    },
    mounted() {
        window.addEventListener('mousewheel',this.handleScroll,false)
        window.addEventListener("DOMMouseScroll",this.handleScroll,false)

    },
    created() {

    }
}
</script>
<style lang="less" scoped>
@import "./cliper.less"
/style>

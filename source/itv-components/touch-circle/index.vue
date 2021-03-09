<template>

    <div class="circle-box"  @touchstart="start" @touchmove="move" >
        <svg viewBox="0 0 100 100">
            <defs>
                <linearGradient id="grad1">
                    <stop offset="0%" stop-color="red"/>
                    <stop offset="100%" stop-color="green"/>
                </linearGradient>
            </defs>
            <path
                fill="none"
                stroke="#aaa"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :d="bgpath"
            ></path>
            <path
                fill="none"
                stroke="url(#grad1)"
                :stroke-width="strokeWidth"
                stroke-linecap="round"
                :d="path"
            ></path>
            <image
            class="itv-circle-point"
                :x="ax"
                :y="ay"
                @touchstart="touchstart($event,0)"
                @touchmove="touchmove($event,0)"
                :width="strokeWidth"
                :height="strokeWidth"
                xlink:href="./imgs/apoint.jpeg"
            />
            <image
                class="itv-circle-point"
                :x="bx"
                :y="by"
                @touchstart="touchstart($event,1)"
                @touchmove="touchmove($event,1)"
                :width="strokeWidth"
                :height="strokeWidth"
                xlink:href="./imgs/bpoint.jpeg"
            />
        </svg>
        
    </div>

</template>

<script>
export default {
    name:'touch-circle',
    props: {
        strokeWidth: {
            type: Number,
            default: 12
        },
        radius: {
            type: Number,
            default: 40
        },
    },
    data() {
        return {
            show: false,
            path: "",
            bgpath: "",
            ax: 0,
            ay: 0,
            bx: 0,
            by: 0,
            adeg:0,
            bdeg:0,
        
            center: {
                x: 0,
                y: 0
            }
        };
    },
    computed: {
        arr() {
            let arr = [];
            for (let i = 0; i <= 360; i += 1.5) {
                let deg = (Math.PI / 180) * i;

                let type =
                    i.toString().split(".").length >= 2 ? "center" : "normal";
                let y = 50 + this.radius * Math.sin(deg);
                let x = 50 + this.radius * Math.cos(deg);

                arr.push({
                    x: x,
                    y: y,
                    type: type,
                    ang: i
                });
            }
            return arr;
        }
    },
    methods: {
        start() {

        },
        move(){

        },
        touchstart(e, type) {
            let top = this.$el.offsetTop;
            let left = this.$el.offsetLeft;
            let width = this.$el.clientWidth;

            this.center = {
                y: (top+width)/2,
                x: (left+width)/2
            }
           

            
        },
        touchmove(e, type) {
            // let y = 50 + 40 * Math.sin(deg);
            // let x = 50 + 40 * Math.cos(deg);
            // let deg = (Math.PI / 180) * i;
            e.preventDefault();
            let self = e.targetTouches;
            let x = self[0].pageX;
            let y = self[0].pageY;
            let r = Math.sqrt((this.center.x - x)*(this.center.x - x)+(this.center.y - y)*(this.center.y - y))
            let pi = Math.acos((x-this.center.x)/r)
            let deg = pi/(Math.PI/180);
            if(y<=this.center.y) {
                deg=180+180-deg;
            }
            deg = parseInt(deg/3)*3
            if(type===1) {
                
                this.progress(deg, this.adeg, 1);

               
            }else{
                this.progress(deg, this.bdeg, 0);
              
            }
           

        },
        init() {
            this.arr.forEach((item, index) => {
                if (index === 0) {
                    this.bgpath = `M ${item.x} ${item.y} `;
                }

                if (index > 0 && item.type === "center") {
                    this.bgpath += `${item.x} ${item.y} `;
                }
            });
            //  90 b点，3000 a点       
            this.progress(90, 300, 0);
        },
        /**
         * 先把移动的两个点分为a,b点
         * point1 为移动点
         * point2 第二个点
         */
        progress(point1, point2, type) {

            
            let res = JSON.parse(JSON.stringify(this.arr));
            let bIndex = point1 / 1.5;
            let eIndex = point2 / 1.5;
            if(type === 0 ) {
                this.adeg = point1;
                this.bdeg = point2;
            }else{
                this.adeg = point2;
                this.bdeg = point1;
            }
           
            let arr = [];
            if (type === 0) {
                this.bx = res[eIndex].x - this.strokeWidth/2;
                this.by = res[eIndex].y - this.strokeWidth/2;
                this.ax = res[bIndex].x - this.strokeWidth/2;
                this.ay = res[bIndex].y - this.strokeWidth/2;

                if (point1 > point2) {
                    arr = res.slice(eIndex, bIndex);
                }

                if (point2 > point1) {
                    arr = res.slice(eIndex, res.length - 1);
                    arr = arr.concat(res.slice(0, bIndex));
                }
               
               
            } else {
                this.ax = res[eIndex].x - this.strokeWidth/2;;
                this.ay = res[eIndex].y - this.strokeWidth/2;;
                this.bx = res[bIndex].x - this.strokeWidth/2;
                this.by = res[bIndex].y - this.strokeWidth/2;
                if (point1 > point2) {
                    arr = res.slice(bIndex, res.length - 1) ;
                    arr = arr.concat(res.slice(0,eIndex));
                }

                if (point2 > point1) {
                    arr = res.slice(bIndex, eIndex);
                }
            }

            // arr = arr.concat(res.slice(0, bIndex));
            // let arr = res.slice(0, 80);
            arr.forEach((item, index) => {
                if (index === 0) {
                    this.path = `M ${item.x} ${item.y} `;
                }

                if (index > 0 && item.type === "center") {
                    this.path += `${item.x} ${item.y} `;
                }
            });
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-touch-circle.less';
</style>

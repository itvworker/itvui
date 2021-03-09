<template>
    <div class="itv-elevator"  ref="itv-elevator" @scroll="scroll" >
        <ul class="itv-elevator-ul"
            ref="itv-elevator-ul"
            >
            <li
            v-for="item in dataArray"
            v-bind:key="item.title"
            class="itv-list-title"
            >
                <h3 class="itv-list-h" :ref="item.title">{{item.title}}</h3>
                <ul class="itv-people-list">
                    <li v-for="(list,idx) in item.list"
                    v-bind:key="idx"
                    class="itv-list-name"
                    :ref="list.id?list.id:'list'+item.title+idx"
                    @click="clickList(list,item)"
                    >{{list.name}}</li>
                </ul>
            </li>
        </ul>
        <ul class="itv-elevator-nav" ref="itv-elevator-nav"
            @touchmove="onPointerMove($event)"
            @touchstart="onPointerMove($event)"
            @touchend="onPointerEnd($event)"
            >
            <li v-for="(item,index) in dataArray"
            v-bind:key="index"
            :ref="'nav'+index"
            class="itv-nav-list"
            :class="{'itv-nav-curr':item.title==currTitle}"
            :style="{height:navListHeight+'px'}"
            @click="clickNav(item.title,index)"
            >{{item.title}}</li>
        </ul>
        <template v-if="showIndicator">
            <div class="itv-big-box" v-show="currBox">
                {{currTitle}}
            </div>
        </template>
    </div>
</template>
<script>
export default {
    name:'itv-elevator',
    props: {
        dataArray:{
            type:Array,
            required:true,
        },
        navHeight:{
            type:Number,
            default:'40',
        },
        hiddenTime:{
            type:Number,
            default:'10',
        },
        showIndicator:{
            type:Boolean,
            default:true,
        },
        initIndex:{
            type:Number,
            default:0,
        }
    },
    computed:{
        navListHeight:function(){
            return this.navHeight;
        }
    },
    data() {
        return {
            currTitle:'',
            currBox:false,
        };
    },
    mounted(){
        this.initPage();
    },
    methods: {
        initPage(){
            // let doc = document.querySelector('.itv-elevator .itv-list-h')
            // console.log(doc.clientHeight);

            this.calcPosition()
            let initIndex = this.dataArray[this.initIndex].title;
            this.$refs[initIndex][0].scrollIntoView()
            this.currTitle = initIndex;



            // document.getElementById(initIndex).scrollIntoView();
        },
        calcPosition() {
            let height= 0;
            this.dataArray.map((item, index)=>{
                let ele = this.$refs[item.title][0]
                if(index===0){
                    item['top']=0;
                    height = ele.offsetTop;
                    return item
                }
                item['top']=ele.offsetTop-height;
                return item
            })

        },
        getStyle(element, attr) {
            if(element.currentStyle) {
                    return element.currentStyle[attr];
            } else {
                    return getComputedStyle(element, false)[attr];
            }
        },
        getFontSize(){
            let htmlDom = document.getElementsByTagName('html')[0];
            let bili = this.getStyle(htmlDom,'fontSize');
            return bili.substring(0,bili.length-2);
        },
        clickNav(title,index){
            this.currBox =true;
            setTimeout(()=>{
                this.currBox =false;
            },this.hiddenTime);
            this.moveFun(title,index);
        },
        clickList(list,item){
            this.$emit('clickList',list,item);
        },
        moveFun(title,index){
            let titleBox = this.$refs[title][0];
            titleBox.scrollIntoView();
        },
        onPointerEnd(e){
            let fontSize = this.getFontSize();
            let dataArrayLength = this.dataArray.length;
            let navHeight = this.$refs['itv-elevator-nav'].clientHeight;
            let navTop = this.$refs['itv-elevator-nav'].offsetTop;
            let navOffsetTop=navTop-navHeight/2 //nav距离顶部的距离
            let eTop = e.type.indexOf('touch') !== -1 ? e.changedTouches[0].clientY : e.clientY;
            //let navIndex =parseInt((eTop - navOffsetTop)/this.navHeight/fontSize);
            let navIndex =parseInt((eTop - navOffsetTop)/this.navHeight);
            setTimeout(()=>{
                this.currBox = false;
            },this.hiddenTime);
            if(navIndex<dataArrayLength && navIndex>=0){
            this.$emit('clickNav',this.dataArray[navIndex].title,navIndex);
            }
        },
        onPointerMove(e){
            e.preventDefault();
            let fontSize = this.getFontSize();
            let dataArrayLength = this.dataArray.length;
            let navHeight = this.$refs['itv-elevator-nav'].clientHeight;
            let navTop = this.$refs['itv-elevator-nav'].offsetTop;
            let navOffsetTop=navTop-navHeight/2 //nav距离顶部的距离
            let eTop = e.type.indexOf('touch') !== -1 ? e.touches[0].clientY : e.clientY;
            //let navIndex =parseInt((eTop - navOffsetTop)/this.navHeight/fontSize);
            let navIndex =parseInt((eTop - navOffsetTop)/this.navHeight);

            if(navIndex<dataArrayLength && navIndex>=0){
                this.moveFun(this.dataArray[navIndex].title,navIndex);
                this.currBox =true;
                this.currTitle = this.dataArray[navIndex].title;
            }
        },
        scroll(e) {
            let top = e.target.scrollTop;
            for(let i = 0, l = this.dataArray.length; i < l; i++) {
                if(i===l-1) {
                    this.currTitle = this.dataArray[i].title
                    break;
                }
               if(top>=this.dataArray[i].top && top<this.dataArray[i+1].top){
                   this.currTitle = this.dataArray[i].title
                   break;
               }

            }
        }
    }
}
</script>

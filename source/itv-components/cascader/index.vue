<template lang="html">
    <itv-dialog v-model="isVisible" type="bottom" :hideOnClick="hideOnClick">
        <div class="level-select-box">
            <div class="level-select-title">
                <div class="btn-cancel"  @click="cancel">{{cancelText}}</div>    
                {{titleText}}
                <div class="btn-confirm" @click="confirmBtn">{{confirmText}}</div>
            </div>
            <itv-scroll ref="header"  :percent="0.7" :speed="40"  pattern="horizontal" class="case-box">
                <div class="level-select-bar">
                    <template v-for="(item,index) in currentItems">
                         <div class="select" :class="{'active': currentHeader===index||(isLast && index === currentItems.length-1 && currentHeader===null)}"  @click="changeNow(index)">
                            {{item[textKey]}}
                        </div>
                        <div class="icon-gengduox arrow-icon" v-if="!(index===currentItems.length-1 && isLast)"></div>
                    </template>
                   
                   <div class="select placeholder" v-if="!isLast" :class="{'active': currentHeader===null}" @click="changeNow(null)">{{placehoder}}</div>
                </div>
            </itv-scroll>
            <itv-scroll ref="body" class="body-scroll"  :percent="0.7" pattern="vertical" >
                <div ref="item" class="level-item height-opt">
                    
                </div>
                <div  class="level-item" :class="{'active': activeIndex === index}" v-for="(item, index) in nowItems" :key="item[idKey]" @click="selectItem(index)">
                    {{item[textKey]}}
                </div>
            </itv-scroll>
        </div>
    </itv-dialog>
</template>

<script>
import ItvDialog from '../dialoger/index.vue';
import ItvScroll from '../scroller/index.vue'
export default {
    name: "cascader",
    components: {
        ItvDialog,
        ItvScroll
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        hideOnClick: { //点击背景隐藏
            type: Boolean,
            default: true
        },
        titleText: { //标题
            type: String,
            default:'请选择分类'
        },
        placehoder: { //请选择的文字
            type: String,
            default: '请选择'
        },
        items: { //数据选项
            type: Array,
            default: ()=>[]
        },
        pidKey: { //父id的健名
            type: String,
            default: 'pid'
        },
        idKey: { //id的健名
            type: String,
            default: 'id'
        },
        selected:{
            type: Array,
            default: ()=>[]
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        confirmText: {
            type: String,
            default: '确定'
        },
        textKey: {
            type: String,
            default: 'name'
        }
    },
    data() {
        return {
            isVisible: this.value,
            currentSelect: JSON.parse(JSON.stringify(this.selected)),
            currentIndex: [],
            currentItems:[],
             //当前头部高亮
            currentHeader:null,
            nowItems:[],
            isLast: false,
            itemHeight: 0,
            cacheNumber:0
        }
    },
    computed: {
        //当前选项
        currented() {
            return null
        },
         activeIndex() {
            
            if(this.currentHeader === null && this.isLast) {
                return  this.currentIndex[this.currentIndex.length-1]
            } 
            if(this.currentHeader === null) {
                return  null
            }
            return this.currentIndex[this.currentHeader]
        }
        //选项
    },
    watch: {
        value(a, b) {
            this.isVisible = a;
            if (!a) {
                this.$emit("close");
            }
            if(a) {
               this.init(true);
              
               
            }
        },
        isVisible(n,o) {
            this.$emit('input', n)
        },
        currentHeader(n,o) {
                
            this.$nextTick(()=>{
               this.$refs.body.calcMax();
               if(n !== null) {
                    this.$refs.body.scrollToNow(0, this.currentIndex[this.currentHeader]*this.itemHeight)
                    return
               }
                if(n === null && this.isLast === false) {
                    this.$refs.body.scrollToNow(0, 0)
                }
            })
            
        },
       
       
    },
    mounted() {
        
    },
    methods: {
        init() {
            this.currentItems = [];
            this.currentIndex = [];
            this.currentHeader = null;
            this.currentSelect = JSON.parse(JSON.stringify(this.selected));
            if(this.selected.length>0) {
                this.selected.forEach((item, index)=>{
                    if(index===0) {
                        let arr = [];
                        this.items.forEach(ele=>{
                            if(ele[this.pidKey]===0) {
                                arr.push(ele);
                            }
                            if(ele[this.idKey] === item){
                                this.currentIndex[index] = arr.length - 1;
                                this.currentItems[index] = JSON.parse(JSON.stringify(ele))
                            }
                        })   
                    }else{
                        let arr = [];
                        this.items.forEach(ele=>{
                            if(ele[this.pidKey]===this.selected[index-1]) {
                                arr.push(ele);
                            }
                            if(ele[this.idKey] === item){
                                this.currentIndex[index] = arr.length - 1;
                                this.currentItems[index] = JSON.parse(JSON.stringify(ele))
                            }
                        })    
                    }
                })
                let arr = []    
                this.currentItems[this.currentItems.length]
                
            }
            this.calcNowItems(true)
            this.$nextTick(()=>{
                this.calcHeight();
                this.$refs.body.calcMax();
            })
            
        },


        calcHeight() {
            this.itemHeight = this.$refs.item.offsetHeight
        },
        changeNow(index) {
            this.currentHeader = index;
            this.calcNowItems()
        },
        selectItem(index) {
            if(this.currentHeader === null) {
                if(this.isLast) {
                    let i = this.currentItems.length -1; 
                    this.$set(this.currentItems,i,JSON.parse(JSON.stringify(this.nowItems[index])));
                    this.$set(this.currentSelect,i,this.nowItems[index][this.idKey]);
                    this.$set(this.currentIndex,i,index);
                   
                }else{
                    this.currentItems.push(JSON.parse(JSON.stringify(this.nowItems[index])))
                    this.currentSelect.push(this.nowItems[index][this.idKey])
                    this.currentIndex.push(index)
                }
              
            }else{
                let len = this.currentItems.length;
                this.currentItems = this.currentItems.splice(0, this.currentHeader+1)
                this.currentSelect = this.currentSelect.splice(0, this.currentHeader+1)
                this.currentIndex = this.currentIndex.splice(0, this.currentHeader+1)
                this.currentItems[this.currentHeader] = JSON.parse(JSON.stringify(this.nowItems[index]))
                this.currentSelect[this.currentHeader] = this.nowItems[index][this.idKey]
                this.currentIndex[this.currentHeader]=index
                this.currentHeader = null;

               
            }
            this.calcNowItems()
            this.$nextTick(()=>{
               if(!this.isLast) {
                   this.$refs.body.scrollToNow(0, 0)
               }
               this.$refs.body.calcMax();
            })
            this.$emit('select', this.currentItems)
        },
        calcNowItems(isInit) {
            
            if(!this.currentSelect) return []
            let data = [];
           
            //没有默认选择的时候
            if(this.currentSelect.length<=0) {
                this.items.forEach(element => {
                    if(element[this.pidKey] === 0 || !element[this.pidKey]) {
                        data.push(element)
                    }   
                });
                 this.nowItems = data;
                 this.$nextTick(()=>{
                  this.$refs.body.calcMax();
                  })
                 return
            }

            //debugger
            if(this.currentSelect.length > 0 && this.currentHeader === null) {
               
                let id = this.currentSelect[this.currentSelect.length-1];
     

                this.items.forEach(element => {
                    if(element[this.pidKey] == id ) {
                        data.push( JSON.parse(JSON.stringify(element)))
                    }   
                });
                if(data.length > 0) {
                    this.nowItems = data
                    this.isLast = false;
                    this.$nextTick(()=>{
                        this.$refs.body.calcMax();
                    })
                }else{
                    this.isLast = true;
                   
                    let obj = this.currentItems[this.currentItems.length-1];
                    this.items.forEach(element => {
                            if(element[this.pidKey] == obj[this.pidKey] ) {
                                data.push( JSON.parse(JSON.stringify(element)))
                            }   
                        });
                    this.nowItems = data;
                    this.$nextTick(()=>{
                         if(JSON.stringify(this.nowItems)!==JSON.stringify(data)) {
                            this.$refs.body.calcMax();
                            this.$refs.body.scrollToNow(0, this.currentIndex[this.currentIndex.length-1]*this.itemHeight)
                        }    
                    })
                   
                    if(isInit) {
                        this.$refs.body.scrollToNow(0, this.currentIndex[this.currentIndex.length-1]*this.itemHeight)
                    }
                }
               return
            }

            if(this.currentSelect.length > 0 && this.currentHeader !== null) {
               
                let pid = this.currentItems[this.currentHeader][this.pidKey] 
                

                this.items.forEach(element => {
                    if(element[this.pidKey] == pid ) {
                        data.push( JSON.parse(JSON.stringify(element)))
                    }   
                });
                this.nowItems = data

                
                this.$nextTick(()=>{
                    this.$refs.body.calcMax();
                })
                 return
            }
        },
        cancel() {
            this.$emit('input', false)
            this.$emit("hide");
            this.$emit("cancel");
        },
        
        confirmBtn() {
            this.$emit('input', false)
            this.$emit("hide");
            this.$emit("confirm", this.currentItems);
        },
        close() {
             this.$emit('input', false)
            this.$emit("hide");
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../assets/css/itv-theme.less';
@import 'itv-cascader.less';
</style>

<template>
    <itv-container class="page-dialog">
        <itv-header>{{$route.name}}</itv-header>
        <itv-main ref="main">
           
          
            
        </itv-main>
    </itv-container>
</template>

<script>
import ScheduleDate from './index';

export default {
    components: {
        ScheduleDate
    },
    data() {
        return {
            
        }
    },
    computed: {
       
    },
    methods: {
       init(obj) {
        let canvas = document.createElement('canvas');
        let div = document.createElement('div');
        let textDiv = document.createElement('div');
       
        div.appendChild(textDiv);
        textDiv.innerHTML = obj.text;
        textDiv.style.fontSize = obj.fontSize+'px';
        textDiv.style.color = obj.color;
        textDiv.lineHeight = obj.fontSize+'px';
        
        div.style.position = 'absolute'
        div.style.left = '0px';
        div.style.bottom ='100px';
        document.body.appendChild(div);
        let height = Math.tan((-30 * Math.PI) / 180) * div.clientWidth

        canvas.width =400;
        canvas.height = Math.abs(height) + obj.fontSize;
        
        
       
        this.$refs.main.$el.appendChild(div)
        this.$refs.main.$el.appendChild(canvas)
        let ctx = canvas.getContext("2d");
        ctx.rotate((obj.rotate * Math.PI) / 180);
        ctx.font = fontSize + 'px Verdana';
        
        ctx.fillText(obj.text, Math.sin(obj.rotate * Math.PI)*(obj.top+height-fontSize/2), obj.left);
        ctx.fillStyle=obj.color;
        // console.log(div.clientWidth);
       }
    },
    created() {
      
    },
    mounted() {
       this.init({
           text:"TEXT",
           color: '#999',
           fontSize: 40,
           padding: 20,
           rotate:-30,
           left: 50,
           top: 50
          
       })
    }

};
</script>

<style lang="less" scoped>
text{
    position:absolute;
    transform: ;
    
}

</style>


 
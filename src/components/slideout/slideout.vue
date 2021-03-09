<template>
<div class="slide-out">
    <slot />
</div>
    
</template>
<script>
export default {
    name: 'slide-out',
    mounted() {
        document.addEventListener('touchstart',this.close, false)
    },
    methods: {
        close(e) {
            let i = 0;
            let parentNode = e.target;
            if(parentNode.className ==='slide-bar-content') {
                return; 
            }
            
            while(parentNode.nodeName.toLowerCase()!=='html') {
                if(parentNode.className ==='slide-bar-content') {
                    this.send();
                    return; 
                }
                if(parentNode.className.split(' ')[0] ==='slide-bar') {
                    return; 
                }
                parentNode = parentNode.parentNode;
            }
            this.send()
        },
        send() {
            this.$children.forEach((item, index)=>{
                if(item.name==='slide-bar' && item.restore){
                    item.restore();
                }
            })
            
        }
    }
}
</script>
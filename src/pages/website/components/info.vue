<template lang="html">
    <div class="doc-page">
        <div v-html="doc"></div>
    </div>
</template>

<script>
import doc from './md/index.js'
import html from '@/doc/doc.js'
export default {
    computed:{
        doc() {
            let name = this.$route.params.type
            let msg = new html(doc[name]).getHtml()
            
            return msg
        },
        
    },
    updated() {
        this.hljs();
    },
    mounted() {
        this.hljs();
    }
}
</script>

<style lang="css" scoped>
.doc-page{
    flex-direction: row;
    flex: 1;
    
}
</style>

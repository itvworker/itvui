<template lang="html">
    <itv-container class="doc-page">
        <div v-html="doc"></div>
        <iframe src="/#/demo/cliper"></iframe>
    </itv-container>
</template>

<script>
import doc from './doc.md'
import html from '@/doc/doc.js'
export default {
    computed:{
        doc() {
            let msg = new html(doc).getHtml()
            return msg
        }
    },
    updated() {
        this.hijs();
    },
    mounted() {
        this.hljs();
    }
}
</script>

<style lang="css" scoped>
</style>

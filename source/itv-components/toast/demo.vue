<template lang="html">
    <itv-container>
        <itv-header>toast</itv-header>
        <itv-main>
            <div class="itv-demo-btn btn-content" @click="text('top')" >
                top
            </div>
            <div class="itv-demo-btn btn-content" @click="text('middle')" >
                middle
            </div>
            <div class="itv-demo-btn btn-content" @click="text('bottom')" >
                bottom
            </div>


            <div class="itv-demo-btn btn-content" @click="warn('middle')" >
                warn
            </div>
            <div class="itv-demo-btn btn-content" @click="cancel('middle')" >
                cancel
            </div>
            <div class="itv-demo-btn btn-content" @click="success('middle')" >
                success
            </div>

        </itv-main>

    </itv-container>

</template>

<script>

// let content = `<svg t="1580716909778" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M512 64a448 448 0 1 1-448 448 448 448 0 0 1 448-448m0-64a512 512 0 1 0 512 512 512 512 0 0 0-512-512z" fill="iconColor"></path><path d="M768 362.24a32 32 0 0 0-44.8 0L448 632.96 302.72 486.4a32 32 0 1 0-46.72 44.8l148.48 147.2 45.44 45.44L768 407.68a32 32 0 0 0 0-45.44z" fill="iconColor"></path></svg>`
// content = content.replace(/</ig,'%3c').replace(/\//ig,'%2f').replace(/>/ig, '%3e').replace(/"/ig, "'")
// console.log(content);

export default {
    data() {
        return {
            // content:content,
            toggle: false
        }
      },

    methods: {
        text(value) {
            this.$itv.toast.text('Holle itvwork',value)
        },
        warn() {
            this.$itv.toast.show({
                text:'警告一下你',
                type:'warn',
                position:'middle',
                showBg:true
            })
        },
        cancel() {
            this.$itv.toast.show({
                text:'你已经取消',
                type:'cancel',
                position:'middle'
            })
        },
        success() {
            this.$itv.toast.show({
                text:'你已经取消',
                type:'success',
                position:'middle'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.btn-content{
    margin: 10ipx 10ipx;
}

</style>

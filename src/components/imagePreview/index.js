import preview from './src/imagePreview.vue'
import './styles/imagePreview.less'

let $vm
const plugin = {
    install(vue, options) {
        const Preview = vue.extend(preview)

        if (!$vm) {
            $vm = new Preview({
                el: document.createElement('div'),
            })
            document.body.appendChild($vm.$el)
        }

        const views = {
            show(obj) {
                if (obj.remove) {
                    $vm.isdel = true
                } else {
                    $vm.isdel = false
                }
                $vm.open(obj.index, obj.images)
                if (obj.download) {
                    $vm.$on('download', (url) => {
                        obj.download(url)
                    })
                }
                if (obj.reload) {
                    $vm.$on('reload', (url) => {
                        obj.reload()
                    })
                }

                if (obj.remove) {
                    $vm.$on('remove', (url) => {
                        obj.remove()
                    })
                }

                $vm.$on('close', () => {
                    $vm.$off('download')
                    $vm.$off('remove')
                    $vm.$off('close')
                })
            },
            hide() {
                $vm.close()
            },
            isVisible() {
                if ($vm.photoswipe) {
                    return true
                } else {
                    return false
                }
            },
        }

        // all Vux's plugins are included in this.$vux
        vue.$preview = views

        vue.mixin({
            created: function() {
                this.$preview = vue.$preview
            },
        })
    },
}

export default plugin
export const install = plugin.install

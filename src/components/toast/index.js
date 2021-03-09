import objectAssign from 'object-assign'
import ToastComponent from './toast.vue'
import merge from '../../libs/merge.js'

let $vm
let watcher

const plugin = {
    install(vue, pluginOptions = {}) {
        const Toast = vue.extend(ToastComponent)
        if (!$vm) {
            $vm = new Toast({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }

        const defaults = {}
        for (let i in $vm.$options.props) {
            if (i !== 'value') {
                defaults[i] = $vm.$options.props[i].default
            }
        }

        const toast = {
            show(options = {}) {
                // debugger
                // destroy watcher
                watcher && watcher()
                if (typeof options === 'string') {
                    merge($vm, objectAssign({}, pluginOptions, {text: options}))
                } else if (typeof options === 'object') {
                    merge($vm, objectAssign({}, pluginOptions, options))
                }
                if (typeof options === 'object' && options.onShow || options.onHide) {
                    watcher = $vm.$watch('show', (val) => {
                        val && options.onShow && options.onShow($vm)
                        val === false && options.onHide && options.onHide($vm)
                    })
                }
                $vm.show = true
            },
            text(text, position = 'middle') {
                this.show({
                    type: 'text',
                    width: 'auto',
                    position,
                    text
                })
            },
            hide() {
                $vm.show = false
            },
            state() {
                return $vm.show
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.$itv) {
            vue.$itv = {
                toast
            }
        } else {
            vue.$itv.toast = toast
        }

        vue.mixin({
            created: function () {
                this.$itv = vue.$itv
            }
        })
    }
}

export default plugin
export const install = plugin.install

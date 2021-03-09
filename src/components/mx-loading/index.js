import LoadingComponet from './index.vue'
import { mergeOptions } from '@/libs/merge'

let $vm

const plugin = {
    install(vue, options = {}) {
        const Component = vue.extend(LoadingComponet)

        if (!$vm) {
            $vm = new Component({
                el: document.createElement('div'),
            })
            document.body.appendChild($vm.$el)
        }

        const opts = {
            text(text = '加载中', disable = true) {
                $vm.text = text
                $vm.disable = disable
                $vm.value = true
                $vm.iconType = ''
            },

            success: function(text = '成功') {
                $vm.text = text
                $vm.disable = false
                $vm.value = true
                $vm.iconType = 'success'
                setTimeout(() => {
                    $vm.value = false
                    $vm.disable = false
                }, 1000)
            },
            failure: function(text = '失败') {
                $vm.text = text
                $vm.disable = false
                $vm.value = true
                $vm.iconType = 'failure'
                setTimeout(() => {
                    $vm.value = false
                    $vm.disable = false
                }, 1000)
            },
            close: function() {
                $vm.value = false
                $vm.disable = false
            },
            show: function(opt) {
                mergeOptions($vm, opt)
            },
            isVisible() {
                return $vm.value
            },
        }

        vue.prototype.$loading = opts
    },
}

export default plugin
export const install = plugin.install

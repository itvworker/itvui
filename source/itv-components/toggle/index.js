import PluginComponent from './index.vue'
import merge from './merge'

let $vm

const plugin = {
    install (vue, options = {}) {
        const Component = vue.extend(PluginComponent)
        if (!$vm) {
            $vm = new Component({
                el: document.createElement('div'),
                propsData: {
                    title: ''
                }
            })
            document.body.appendChild($vm.$el)
        }

        const opts = {
            show (options) {
                $vm.zindex=99;
             
                $vm.$refs.msg.innerHTML = ''   
                $vm.$refs.msg.appendChild(options.dom);
           
                if (typeof options === 'object') {
                    merge($vm, options)
                }
                $vm.$off('hide')
                $vm.$off('show')
                $vm.$off('confirm')

                $vm.$on('hide', (msg) => {
                    options && options.onHide && options.onHide(msg)
                    $vm.value = false
                })

                $vm.$on('show', (msg) => {
                    options && options.onShow && options.onShow(msg)
                })
                $vm.$on('confirm', (msg) => {
                    options && options.onConfirm && options.onConfirm(msg)
                })
                $vm.value = true
            },
            hide () {
                $vm.value = false
            },
            isVisible () {
                return $vm.value
            }
        }

        vue.prototype.$toggle = opts
       
    }
}

export default plugin
export const install = plugin.install

import PopupComponent from './popup.vue'
import merge from '../../libs/merge.js'

let $vm

const plugin = {
    install (vue, pluginOptions = {}) {
        const Popup = vue.extend(PopupComponent)
        if (!$vm) {
            $vm = new Popup({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        function init () {
            let def = {
                value: false,
                hideOnClick: false,
                hideBtnCancel: false,
                confirmText: '确认',
                cancelText: '取消',
                title: '',
                content: '' }
                merge($vm, def)   
        }
        const popup = {
            alert (options = {}) {
                init()
                merge($vm, options) 
                $vm.value = true
                $vm.hideBtnCancel = true
                $vm.$on('cancel', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }
                })

                $vm.$on('confirm', () => {

                    $vm.value = false
                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })

                $vm.$on('hide', () => {
                    if (options.onHide) {
                        options.onHide()
                    }
                    $vm.$off('cancel')
                    $vm.$off('confirm')
                    $vm.$off('hide')
                })
            },
            confirm (options = {}) {
                init()
                merge($vm, options) 
                $vm.value = true
                $vm.hideBtnCancel = false
                $vm.$on('cancel', () => {
                    $vm.value = false
                    if (options.onHide) {
                        options.onHide()
                    }
                })

                $vm.$on('confirm', () => {
                    $vm.value = false
                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })
                

                $vm.$on('hide', () => {
                    if (options.onHide) {
                        options.onHide()
                    }
                    $vm.$off('cancel')
                    $vm.$off('confirm')
                    $vm.$off('hide')
                })
            },
            hide () {
                $vm.value = false
            },
            state () {
                return $vm.value
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {
                popup
            }
        } else {
            vue.prototype.$itv.popup = popup
        }

       
    }
}

export default plugin
export const install = plugin.install

import DialogComponent from './dialog.vue';
import objectAssign from 'object-assign'
import merge from '../../libs/merge'

let $vm
let watcher


const plugin = {
    install(vue, pluginOptions = {}) {
        const Dialog = vue.extend(DialogComponent);
        if (!$vm) {
            $vm = new Dialog({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        
        const dialog = {
            show(options= {}) {
                merge($vm, objectAssign({}, pluginOptions, options))
                $vm.value = true
            },
            hide() {
                $vm.value = false
            },
            state() {
                return $vm.value
            }
        }

        $vm.$el.children[0].addEventListener('click', ()=>{

            $vm.value = false
        })
        console.log($vm.$el.children[0])
        if (!vue.prototype.$itv) {
          vue.prototype.$itv = {
            dialog
          }
        } else {
          vue.prototype.$itv.dialog  = dialog
        }

        

    }
}


export default plugin
export const install = plugin.install

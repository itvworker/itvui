import PluginComponent from '../itv-components/calendar-time/index.vue'
import merge from '../libs/merge'
import {formatDate} from '../libs/tool'
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
                $vm.weekText =  ["日", "一", "二", "三", "四", "五", "六"];
                $vm.confirmText = "确定"
                $vm.titleText = '请选择日期'
                $vm.value = formatDate('', 'Y-M-D h:m');
                $vm.minDate ="2020-08-01 00:00"
                $vm.maxDate ='2200-12-30 23:59'
                $vm.dateType = 'calendar-time'
                $vm.calendarDir = "column"
                $vm.style = 'average'
                if(options.dateType === "time") {
                    if(!options.minDate){
                        options.minDate = "00:00"
                    }
                    if(!options.maxDate){
                        options.maxDate = "23:59"
                    }
                    if(!options.value) {
                        options.value = formatDate('', 'h:m')
                    }
                    options.value = formatDate('', 'Y-M-D ')+options.value;
                    options.minDate = formatDate('', 'Y-M-D ')+options.minDate;
                    options.maxDate = formatDate('', 'Y-M-D ')+options.maxDate;
                    options.pickerRows = 5;    
                    $vm.dataType = 1;
                }
                     

                if (typeof options === 'object') {
                    merge($vm, options)
                }
                
                $vm.isVisible = true;
                $vm.init();
                $vm.$nextTick(()=>{
                       
                    $vm.resize()
                })
                
                $vm.$off('hide')
                $vm.$off('confirm')
                $vm.$on('confirm', (msg) => {
                    if(options.confirm) {
                        options.confirm(msg)
                    }
                })

            },
            hide () {
                $vm.isVisible = false
            },
            isVisible () {
                return $vm.isVisible
            }
        }

        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {}
        }
        vue.prototype.$itv.calendarTime = opts
      
    }
}

export default plugin
export const install = plugin.install


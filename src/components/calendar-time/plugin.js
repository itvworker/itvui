import PluginComponent from './index.vue'
import merge from '../../libs/merge'

let $vm

function formatDate(arg, format) {
    // console.log(typeof arg.toString());
    let now
    if (!arg) {
        now = new Date()
    } else {
        now = new Date(arg)
    }

    format = format || 'Y/M/D h:m'
    const year = now.getFullYear()
    let month = now.getMonth() + 1
    month = month >= 10 ? month : '0' + month
    let date = now.getDate()
    date = date >= 10 ? date : '0' + date
    let hour = now.getHours()
    hour = hour >= 10 ? hour : '0' + hour
    let minute = now.getMinutes()

    minute = minute >= 10 ? minute : '0' + minute
    let second = now.getSeconds()
    second = second >= 10 ? second : '0' + second
    return format
        .replace('Y', year)
        .replace('M', month)
        .replace('D', date)
        .replace('h', hour)
        .replace('m', minute)
        .replace('s', second)
}

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


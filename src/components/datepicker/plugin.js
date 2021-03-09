import PluginComponent from './datepicker.vue'
import merge from '../../libs/merge.js'

let $vm

const plugin = {
    install (vue, pluginOptions = {}) {
        const Plugin = vue.extend(PluginComponent)
        if (!$vm) {
            $vm = new Plugin({
                el: document.createElement('div')
            })
            document.body.appendChild($vm.$el)
        }
        function init () {
            let def = {
                defaultValue:null,
                startDate:null,
                endDate:null,
                hideOnClick: true,
                type:'date',
                isSetSecond:false,
                isUse12Hours: false,
                isAm: true,
                minuteStep: 1,
                secondStep: 1,
                defaultValue:null,
                startDate:'2000-12-31 00:00:00',
                endDate:'2200-12-31 23:59:59',
                startHour:0,
                endHour:23,
                use12Hours:['上午', '下午'],
                yearType:  `{value}年`,
                monthType: `{value}月`,
                dayType: `{value}日`,
                hourType: `{value}时`,
                minType: `{value}分`,
                secType: `{value}秒`,
                cancelText:'取消',
                confirmText:'确认',
                title: '请选择日期'
            }

          
                merge($vm, def)   
        }
        const opts = {
            show (options = {}) {

                if(options.removeFormat) {
                    options.yearType = `{value}`;
                    options.monthType = `{value}`;
                    options.dayType = `{value}`;
                    options.hourType = `{value}`;
                    options.minType = `{value}`;
                    options.secType = `{value}`;
                }
                merge($vm, options) 
                $vm.isVisible = true
                $vm.init()
                $vm.$on('hide', () => {
                    opts.hide()
                    if (options.onHide) {
                        options.onHide()
                    }
                })
                $vm.$on('confirm', (value) => {
                    opts.hide()
                    options.confirm(value)
                })
                $vm.$on('hide', () => {
                    
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
                   
                })

                $vm.$on('confirm', () => {
                   
                    
                    if (options.onConfirm) {
                        options.onConfirm()
                    }
                })
                

               
            },
            hide () {
                $vm.isVisible = false
                
             
            },
            state () {
                return $vm.value
            }
        }

        // all Vux's plugins are included in this.$vux
        if (!vue.prototype.$itv) {
            vue.prototype.$itv = {
                datepicker: opts 
            }
        } else {
            vue.prototype.$itv.datepicker = opts 
        }
       
       
    }
}

export default plugin
export const install = plugin.install

import Vue from 'vue'
import ItvCell from './cell'
import ItvToast from './toast/plugin.js'
import ItvElevator from './elevator/index.js'
import ItvSlider from './slider/index.js'
import ItvDialog from './dialoger/index.js'
import PluginDialog from './dialoger/plugin.js'
import PluginPopup from './popup/plugin.js'
import PluginDatepicker from './datepicker/plugin.js'
import PluginCalendarTime from './calendar-time/plugin.js'
import PluginActionsheet from '../plugins/actionsheet'
import PluginCascader from '../plugins/cascader.js'


// import './cell/cell.less'
Vue.use(PluginCascader)
Vue.use(PluginActionsheet)
Vue.use(PluginDatepicker);
Vue.use(PluginCalendarTime)
Vue.use(ItvCell);
Vue.use(ItvToast);
Vue.use(ItvElevator);
Vue.use(ItvSlider);
Vue.use(ItvDialog)
Vue.use(PluginDialog);
Vue.use(PluginPopup);

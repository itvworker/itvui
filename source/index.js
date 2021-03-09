import actionsheet from './itv-components/actionsheet';
import calendarTime from './itv-components/calendar-time';
import cascader from './itv-components/cascader';
import cell from './itv-components/cell';
import touchCircle from './itv-components/touch-circle';
import cliper from './itv-components/cliper';
import dialoger from './itv-components/dialoger';
import drawer from './itv-components/drawer';
import elevator from './itv-components/elevator'
import loading from './itv-components/loading';
import picker from './itv-components/picker';
import popup from './itv-components/popup';
import schedule from './itv-components/schedule';
import srcoller from './itv-components/scroller';
import srcollerElevator from './itv-components/scroller-elevator';
import slidebutton from './itv-components/slidebutton';
import slideitem from './itv-components/slideitem';
import slideout from './itv-components/slideout';
import sliver from './itv-components/sliver';
import sliverContainer from './itv-components/sliver-container';
import miniSwiper from './itv-components/mini-swiper';
import miniSwiperItem from './itv-components/mini-swiper-item';
import toast from './itv-components/toast';
import playVideo from './itv-components/play-video'


import PulginActionsheet from './plugins/actionsheet.js';
import PulginCalendarTime from './plugins/calendarTime.js';
import PulginCascader from './plugins/cascader.js';
import PulginDialog from './plugins/dialog.js';
import PulginLoading from './plugins/loading.js';
import PulginPopup from './plugins/popup.js';
import PulginToast from './plugins/toast.js';




export {
    //组件
    actionsheet,
    calendarTime,
    cascader,
    cell,
    touchCircle, 
    cliper,
    dialoger,
    drawer, 
    elevator,
    loading, 
    picker,
    popup, 
    schedule,
    srcoller,
    srcollerElevator,
    slidebutton,
    slideitem,
    slideout,
    sliver,
    sliverContainer,
    miniSwiper, 
    miniSwiperItem,
    toast,
    playVideo,

    //插件
    PulginActionsheet,
    PulginCalendarTime,
    PulginCascader,
    PulginDialog,
    PulginLoading,
    PulginPopup,
    PulginToast
}

let Components = [
    //组件
    actionsheet,
    calendarTime,
    cascader,
    cell,
    touchCircle,
    cliper,
    dialoger,
    drawer, 
    elevator,
    loading, 
    picker,
    popup, 
    schedule,
    srcoller,
    srcollerElevator,
    slidebutton,
    slideitem,
    slideout,
    sliver,
    sliverContainer,
    miniSwiper, 
    miniSwiperItem,
    toast,
    playVideo,

    //插件
    PulginActionsheet,
    PulginCalendarTime,
    PulginCascader,
    PulginDialog,
    PulginLoading,
    PulginPopup,
    PulginToast,
]

console.error('itv-全局安装时会看到这个，或者没引入ItvPlugin按需加载会出现打包过大');
export default {
    install: function(Vue) {
        Components.forEach((item, index)=>{
            item.install(Vue)
        })
    }
};
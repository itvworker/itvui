import Drawer from './drawer.vue';
import './drawer.less';

Drawer.install = function(Vue) {
    Vue.component(Drawer.name, Drawer);
};


export default Drawer

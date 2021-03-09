import Scroller from './scroller.vue';
import './scroller.less';

Scroller.install = function(Vue) {
  Vue.component(Scroller.name, Scroller);
};

export default Scroller
import Cell from './tab.vue';
import './cell.less';


Cell.install = function(Vue) {
  Vue.component(Cell.name, Cell);
};

export default Cell;

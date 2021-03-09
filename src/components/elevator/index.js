import Elevator from './elevator.vue';
import './elevator.less';

Elevator.install = function(Vue) {
  Vue.component(Elevator.name, Elevator);
};

export default Elevator

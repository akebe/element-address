import AreaDialog from './src/AreaDialog.vue';
import './src/index.less';

AreaDialog.install = Vue => {
  Vue.component(AreaDialog.name, AreaDialog);
};

export default AreaDialog;
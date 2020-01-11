import Vue from 'vue';
import App from './App.vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//import ElementAddress from 'element-address';

import ElementAddress from '../packages/index.js';

//import ElementAddress from '../lib/element-address.umd.js';

Vue.use(ElementUI);

Vue.use(ElementAddress, {useAll: true});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

export {
  ElementAddress,
};

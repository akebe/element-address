import ElAreaCascader from './components/ElAreaCascader';
import ElAddressForm from './components/ElAddressForm';

export {
  ElAreaCascader,
  ElAddressForm,
};

export default {
  install(Vue) {
    Vue.component(ElAreaCascader.name, ElAreaCascader);
    Vue.component(ElAddressForm.name, ElAddressForm);
  },
};
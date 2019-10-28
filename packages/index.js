import ElAreaCascader from './components/ElAreaCascader';
import ElAddressForm from './components/ElAddressForm';
import ElAddressDialog from './components/ElAddressDialog';

export {
  ElAreaCascader,
  ElAddressForm,
  ElAddressDialog,
};

export default {
  install(Vue) {
    Vue.component(ElAreaCascader.name, ElAreaCascader);
    Vue.component(ElAddressForm.name, ElAddressForm);
    Vue.component(ElAddressDialog.name, ElAddressDialog);
  },
};
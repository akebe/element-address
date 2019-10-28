import ElAreaCascader from './components/ElAreaCascader';
import ElAddressForm from './components/ElAddressForm';
import ElAddressDialog from './components/address-dialog/ElAddressDialog';
import AddressDialog from './components/address-dialog/address-dialog';

export {
  ElAreaCascader,
  ElAddressForm,
  ElAddressDialog,
  AddressDialog
};

const ElementAddress = {
  install(Vue, {useAll = false} = {}) {
    Vue.component(ElAreaCascader.name, ElAreaCascader);
    Vue.component(ElAddressForm.name, ElAddressForm);
    if (useAll) {
      Vue.component(ElAddressDialog.name, ElAddressDialog);
    }
  },
  AddressDialog,
};

export default ElementAddress;
import AddressParse, {Utils, AREA} from 'address-parse';
import ElAreaCascader from './components/ElAreaCascader';
import ElAddressForm from './components/ElAddressForm';
import ElAddressDialog from './components/address-dialog/ElAddressDialog';
import ElAreaDialog from './components/area-dialog/src/AreaDialog.vue';
import $dialog, {AddressDialog} from './components/address-dialog/address-dialog';
import Style from './style';

Style();

export {
  ElAreaCascader,
  ElAddressForm,
  ElAddressDialog,
  AddressDialog,
  AddressParse,
  Utils,
  AREA,
};

const ElementAddress = {
  install(Vue) {
    Vue.component(ElAreaCascader.name, ElAreaCascader);
    Vue.component(ElAddressForm.name, ElAddressForm);
    Vue.component(ElAddressDialog.name, ElAddressDialog);
    Vue.component(ElAreaDialog.name, ElAreaDialog);
  },
  $dialog: (data, options) => $dialog.open(data, options),
};

export default ElementAddress;
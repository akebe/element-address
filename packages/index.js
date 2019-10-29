import AddressParse, {Utils, AREA} from 'address-parse';
import ElAreaCascader from './components/ElAreaCascader';
import ElAddressForm from './components/ElAddressForm';
import ElAddressDialog from './components/address-dialog/ElAddressDialog';
import AddressDialog from './components/address-dialog/address-dialog';
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
  install(Vue, {useAll = false} = {}) {
    Vue.component(ElAreaCascader.name, ElAreaCascader);
    Vue.component(ElAddressForm.name, ElAddressForm);
    if (useAll) {
      Vue.component(ElAddressDialog.name, ElAddressDialog);
    }
  },
  $dialog: AddressDialog,
};

export default ElementAddress;
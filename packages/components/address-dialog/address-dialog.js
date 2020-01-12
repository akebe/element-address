import Vue from 'vue';
import ElAddressDialog from './ElAddressDialog';

const callbacks = [];

let vm = null, init = false, current = null;

function queueHandle() {
  if (current) {
    callbacks.splice(0, 1);
    current = null;
  }
  if (callbacks.length) {
    current = callbacks[0];
    open();
  }
}

function open() {
  if (current) {
    const {data, options, resolve} = current;
    vm.open(data, options).then(resolve);
  }
}

function vmCreate() {
  if (!init) {
    init = true;
    const el = document.createElement('div');
    document.body.appendChild(el);
    new Vue({
      render: h => h(ElAddressDialog),
      mounted() {
        this.$nextTick(() => {
          vm = this.$children[0];
          vm.$on('closed', () => {
            queueHandle();
          });
          queueHandle();
          AddressDialog.$vm = vm;
        });
      },
    }).$mount(el);
  }
}

function AddressDialog(data, options) {
  return new Promise((resolve => {
    callbacks.push({data, options, resolve});
    if (!init) {
      vmCreate();
    }
    if (vm && !current) {
      queueHandle();
    }
  }));
}

export default AddressDialog;
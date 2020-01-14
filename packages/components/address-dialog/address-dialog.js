import Vue from 'vue';
import ElAddressDialog from './ElAddressDialog';

class AddressDialog {

  constructor(DialogComponent = ElAddressDialog) {
    this.DialogComponent = DialogComponent;
    this.callbacks = [];
    this.vm = null;
    this.init = false;
    this.current = null;
  }

  open(data, options) {
    if (!this.init) this.creates();
    return new Promise((resolve => {
      this.callbacks.push({data, options, resolve});
      if (this.vm && !this.current) {
        this.queueHandle();
      }
    }));
  }

  creates() {
    const that = this;
    if (!that.init) {
      that.init = true;
      const {DialogComponent, open} = that;
      const el = document.createElement('div');
      document.body.appendChild(el);
      new Vue({
        render: h => h(DialogComponent),
        mounted() {
          this.$nextTick(() => {
            that.vm = this.$children[0];
            that.vm.$on('closed', () => {
              that.queueHandle();
            });
            that.queueHandle();
            open.$vm = that.vm;
          });
        },
      }).$mount(el);
    }
  }

  queueHandle() {
    if (this.current) {
      this.callbacks.splice(0, 1);
      this.current = null;
    }
    if (this.callbacks.length) {
      this.current = this.callbacks[0];
      this._open();
    }
  }

  _open() {
    const {current, vm} = this;
    if (current) {
      const {data, options, resolve} = current;
      vm.open(data, options).then(resolve);
    }
  }
}

export {AddressDialog} ;

export default new AddressDialog();
import Vue from 'vue';
import ElAddressDialog from './ElAddressDialog';

let calls = [];

let vm = null;

/**
 * 函数式调用 ElAddressDialog
 * @param data    地址数据对象
 * @param options 配置参数
 * @returns {Promise<any>}
 * @constructor
 */
function AddressDialog(data, options) {
  return new Promise(resolve => {
    if (!vm) {
      calls.push([data, options, resolve]);
      const el = document.createElement('DIV');
      document.body.appendChild(el);
      new Vue({
        render: h => h(ElAddressDialog),
        mounted() {
          this.$nextTick(() => {
            vm = this.$children[0];
            for (let [data, options, resolve] of calls) {
              vm.open(data, options).then(resolve);
            }
            calls = [];
          });
        },
      }).$mount(el);
    } else {
      vm.open(data, options).then(resolve);
    }
  });
}

export default AddressDialog;
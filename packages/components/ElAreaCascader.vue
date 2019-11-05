<template>
  <el-cascader
      v-model="mValues"
      :clearable="clearable"
      :filterable="filterable"
      :options="options"
      :popper-class="radioHide ? 'el-radio_hide': ''"
      :props="mProps"
      :size="size"
      :disabled="disabled"
      :placeholder="placeholder"
  >
  </el-cascader>
</template>
<script>
  import AreaCascader from '../utils/area-cascader-options';

  export default {
    name: 'ElAreaCascader',
    props: {
      size: {
        type: String,
        default: '',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      clearable: {
        type: Boolean,
        default: true,
      },
      filterable: {
        type: Boolean,
        default: true,
      },
      radioHide: {
        type: Boolean,
        default: true,
      },
      disabled: Boolean,
      props: Object,
      placeholder: String,
    },
    data() {
      return {
        options: AreaCascader.options,
      };
    },
    computed: {
      mProps() {
        return {
          checkStrictly: true,
          expandTrigger: 'hover',
          ...this.props,
        };
      },
      mValues: {
        get() {
          const code = this.value.toString();
          return AreaCascader.codes[code] || [];
        },
        set(codes) {
          this.$emit('input', codes[codes.length - 1] || '');
          const result = [];
          if (codes.length) {
            let list = this.options;
            for (let code of codes) {
              const item = list.find(({value}) => value === code);
              result.push({
                value: code,
                label: item ? item.label : '',
              });
              list = item && item.children ? item.children : [];
            }
          }
          this.$emit('change', codes[codes.length - 1], result, codes);
        },
      },
    },
    methods: {},
  };
</script>
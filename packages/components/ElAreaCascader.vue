<template>
  <el-cascader
      v-model="mValues"
      :clearable="clearable"
      :filterable="filterable"
      :options="options"
      :popper-class="radioHide ? '_radio-hide': ''"
      :props="mProps"
      :size="size"
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
          this.$emit('change', result, codes);
        },
      },
    },
    methods: {},
  };
</script>
<style>
  ._radio-hide .el-radio__inner {
    border: 0;
    background-color: inherit
  }

  ._radio-hide .el-radio__input.is-checked .el-radio__inner {
    background: none
  }

  ._radio-hide .el-radio {
    height: 100%;
    width: 150px;
    position: absolute;
  }
</style>
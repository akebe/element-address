<template>
  <div class="el-district-checkbox-group">
    <div class="_district">
      <el-checkbox
        v-model="isChecked"
        :indeterminate="isIndeterminate"
      >
        {{ data.name }}
      </el-checkbox>
    </div>
    <div class="_province">
      <el-area-popover
        v-for="item in data.children"
        :key="item.code"
        :data="item"
        :value="value"
        @input="v => $emit('input', v)"
      />
    </div>
  </div>
</template>

<script>
  import ElAreaPopover from './AreaPopover.vue';

  export default {
    name: 'AreaCheckboxGroup',
    components: {ElAreaPopover},
    props: {
      data: {
        type: Object,
        default: () => ({
          code: '',
          name: '',
          children: [],
        }),
      },
      value: {
        type: Array,
        default: () => [], //[{code,children}] // children是空的意味着全选
      },
    },
    computed: {
      isIndeterminate() {
        return !this.isChecked && !!this.checkedChildren;
      },
      checkedChildren() {
        return this.value.reduce((len, v) => {
          const child = this.data.children.find(child => child.code === v.code);
          return len + (child ? v.children.length ? 0.5 : 1 : 0);
        }, 0);
      },
      isChecked: {
        get() {
          return this.checkedChildren === this.data.children.length;
        },
        set(checked) {
          const value = this.value.filter(v => !this.data.children.some(child => child.code === v.code));
          if (checked) {
            value.push(...this.data.children.map(child => ({
              code: child.code,
              children: [],
            })));
          }
          this.$emit('input', value);
        },
      },
    },
  };
</script>

<style scoped lang="less">
  .el-district-checkbox-group {
    display: flex;

    ._district {
      width: 100px;
    }

    ._province {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
    }
  }
</style>
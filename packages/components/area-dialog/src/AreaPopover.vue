<template>
  <div class="el-area-popover_body">
    <el-popover
      placement="bottom"
      popper-class="el-area-popover"
      width="255"
      trigger="click">
      <el-checkbox
        v-for="item in data.children"
        :key="item.code"
        :label="item.code"
        :value="checkedChildren.some(v=> v.code === item.code)"
        :disabled="disabled"
        @input="v => handleCheckChange(v,  item)"
      >
        {{ item.name }}
      </el-checkbox>
      <span slot="reference">
        <el-checkbox
          v-model="isChecked"
          :indeterminate="isIndeterminate"
          :disabled="disabled"
          class="_checkbox"
          @click.stop
        >
          {{ label }}
        </el-checkbox>
        <a slot="reference" class="el-icon-arrow-down el-icon--right"/>
      </span>
    </el-popover>
  </div>
</template>
<script>
  export default {
    name: 'ElAreaPopover',
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
        default: () => [],
      },
      disabled: Boolean,
    },
    computed: {
      isIndeterminate() {
        return !this.isChecked && !!this.checkedChildren.length;
      },
      isChecked: {
        get() {
          return this.checkedChildren.length && this.checkedChildren.length === this.data.children.length;
        },
        set(checked) {
          const value = this.value.filter(v => v.code !== this.data.code);
          if (checked) {
            value.push({
              code: this.data.code,
              children: [],
            });
          }
          this.$emit('input', value);
        },
      },
      checkedChildren() {
        const value = this.value.find(v => v.code === this.data.code);
        if (value) {
          return value.children.length ? value.children : this.data.children;
        }
        return [];
      },
      label() {
        let label = this.data.name;
        const length = this.checkedChildren.length;
        return `${label}${length ? '(' + length + ')' : ''}`;
      },
    },
    methods: {
      handleCheckChange(checked, item) {
        let value = this.value;
        let data = value.find(v => v.code === this.data.code);
        const isCheckedAll = data && !data.children.length;
        if (!data) {
          data = {
            code: this.data.code,
            children: [],
          };
          value = [...value, data];
        }
        data.children = data.children.filter(v => v.code !== item.code);
        if (checked) {
          data.children.push({code: item.code});
        } else {
          if (isCheckedAll) {
            data.children = this.data.children.filter(v => v.code !== item.code).map(v => ({code: v.code}));
          } else if (!data.children.length) {
            value = value.filter(v => v.code !== this.data.code);
          }
        }
        this.$emit('input', value);
      },
    },
  };
</script>
<style scoped lang="less">
  .el-area-popover_body {
    width: 33%;

    .el-icon-arrow-down {
      cursor: pointer;
      margin-bottom: 15px;

      &:hover {
        color: #409eff;
      }
    }
  }
</style>
<style lang="less">
  .el-area-popover {
    padding-bottom: 5px;
    box-sizing: border-box;

    .el-checkbox {
      margin-bottom: 10px;
      margin-right: 0;

      .el-checkbox__label {
        min-width: 90px;
      }
    }
  }
</style>
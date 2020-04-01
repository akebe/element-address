<template>
  <el-dialog
    append-to-body
    width="760px"
    :close-on-click-modal="false"
    :title="title"
    :visible.sync="visible"
  >
    <el-area-checkbox-group
      v-for="district in areas"
      v-model="value"
      :key="district.code"
      :data="district"
    />
    <div slot="footer">
      <el-button :size="size" @click="visible = false">取 消</el-button>
      <el-button type="primary" :size="size" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import areas from './areas.js';
  import ElAreaCheckboxGroup from './AreaCheckboxGroup.vue';

  export default {
    name: 'ElAreaDialog',
    components: {ElAreaCheckboxGroup},
    props: {
      title: {
        type: String,
        default: '选择地区',
      },
      size: {
        type: String,
        default: 'medium',
      },
    },
    data() {
      return {
        areas,
        visible: false,
        value: [],
      };
    },
    computed: {},
    methods: {
      open(value = []) {
        return new Promise(resolve => {
          this.resolve = resolve;
          this.value = value;
          this.visible = true;
        });
      },
      confirm() {
        this.resolve && this.resolve(this.value);
        this.visible = false;
      },
    },
  };
</script>
<template>
  <el-dialog
      :title="mOptions.title"
      :visible.sync="visible"
      :width="mOptions.width"
      :before-close="beforeClose"
      :close-on-click-modal="mOptions.closeOnClickModal"
      @closed="closed"
      append-to-body
      ref="dialog"
      class="el-address-dialog"
  >
    <el-address-form
        :data="mData"
        v-bind="mOptions"
        ref="form"
    />
    <div slot="footer">
      <el-button
          v-if="mOptions.resetButton"
          style="border-style: dashed"
          :size="mOptions.size"
          @click="reset()">
        {{ mOptions.resetButtonText}}
      </el-button>
      <el-button
          :size="mOptions.size"
          @click="cancel()">
        {{ mOptions.cancelButtonText}}
      </el-button>
      <el-button
          :size="mOptions.size"
          type="primary"
          @click="confirm()">
        {{ mOptions.confirmButtonText}}
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  import ElAddressForm from '../ElAddressForm';

  const defaultData = {
    name: '',
    mobile: '',
    phone: '',
    code: '',
    details: '',
    company: '',
    zip_code: '',
    province: '',
    city: '',
    area: '',
  };

  const defaultOptions = {
    // 通用配置
    size: 'small',
    // ElAddressForm 配置
    labelWidth: undefined,
    labels: undefined,
    areaProps: undefined,
    placeholders: undefined,
    rules: undefined,
    rulesMobileEither: false,
    assignedBefore: undefined,
    // 当前组件配置
    title: '地址编辑',
    cancelButtonText: '关 闭',
    confirmButtonText: '确 定',
    resetButtonText: '清 空',
    resetButton: false,
    beforeResolve: undefined, // 确认前回调 (data, done) 需要触发done才正式关闭 done(false) 终止
    beforeClose: undefined,   // 关闭前回调 (data, done) 需要触发done才正式关闭
    width: '700px',
    closeOnClickModal: false,
  };

  export default {
    name: 'ElAddressDialog',
    components: {
      ElAddressForm,
    },
    props: {},
    watch: {},
    data() {
      return {
        mData: {
          ...defaultData,
        },
        mOptions: {
          ...defaultOptions,
        },
        visible: false,
        loading: undefined,
        resolve: null,
      };
    },
    computed: {},
    methods: {
      open(data = {}, options = {}) {
        if (this.baseData !== data) {
          this.$refs.form && this.$refs.form.clear();
          this.mData = Object.assign({}, defaultData, data);
          this.baseData = data;
        }
        this.mOptions = Object.assign({}, defaultOptions, options);
        this.$nextTick(() => {
          this.visible = true;
        });
        return new Promise((resolve => {
          this.resolve = resolve;
        }));
      },
      confirm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.mOptions.beforeResolve) {
              this.loadingStart();
              this.mOptions.beforeResolve(this.mData, state => {
                this.loadingClose();
                if (state !== false) {
                  this.resolve({...this.mData});
                  this.visible = false;
                }
              });
            } else {
              this.resolve({...this.mData});
              this.visible = false;
            }
          }
        });
      },
      cancel() {
        this.beforeClose(() => {
          this.visible = false;
        });
      },
      reset() {
        this.$refs.form.clear();
      },
      closed() {
        this.loadingClose();
        this.$emit('closed');
      },
      beforeClose(done) {
        if (this.mOptions.beforeClose) {
          this.mOptions.beforeClose({...this.mData}, done);
        } else {
          done();
        }
      },
      loadingStart() {
        if (this.$loading && !this.loading) {
          let target = this.$refs.dialog.$el.querySelector('.el-dialog');
          this.loading = this.$loading({target});
        }
      },
      loadingClose() {
        if (this.loading) {
          this.loading.close();
          this.loading = undefined;
        }
      },
    },
    created() {
    },
    mounted() {
    },
  };
</script>
<style>
  .el-address-dialog .el-dialog__body {
    padding: 10px 20px 0;
  }

  .el-address-dialog_footer {
    display: flex;
  }
</style>
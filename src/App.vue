<template>
  <div id="app">
    <div class="_card">
      <div class="_card-header">
        <div class="_card-label">
          地址解析
        </div>
        <div class="_card-action">
          <el-button :size="size" round @click="save">保存地址</el-button>
          <el-button :size="size" round @click="setDefault">使用默认地址</el-button>
          <el-button :size="size" round @click="$refs.address.clear()">清空</el-button>
        </div>
      </div>
      <el-address-form
          :size="size"
          :data="data"
          ref="address"
      ></el-address-form>
    </div>
    <div class="_card">
      <el-button :size="size" @click="dialog">弹出层地址编辑</el-button>
    </div>
    <el-address-dialog ref="dialog"></el-address-dialog>
  </div>
</template>

<script>
  import ElAddressForm from '../packages/components/ElAddressForm';
  import ElAddressDialog from '../packages/components/ElAddressDialog';

  export default {
    name: 'app',
    components: {ElAddressDialog, ElAddressForm},
    data() {
      return {
        size: 'small',
        data: {
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
        },
      };
    },
    methods: {
      save() {
        this.$refs.address.validate(valid => {
          if (valid) {
            this.$message.success('SUCCESS');
          } else {
            this.$message.error('ERROR');
          }
        });
      },
      setDefault() {
        this.data = {
          name: 'asseek',
          mobile: '15000000000',
          phone: '',
          code: '350181',
          details: '石竹街道 义明综合楼3F',
          company: '',
          zip_code: '',
          province: '福建省',
          city: '福州市',
          area: '福清市',
        };
      },
      dialog() {
        this.$refs.dialog.open({}, {
          beforeResolve: (data, done) => {
            setTimeout(() => {
              done();
            }, 1000);
          },
        }).then(result => {
          this.$alert(JSON.stringify(result, null, 2), {
            title: '结果',
            dangerouslyUseHTMLString: true,
          });
        });
      },
    },
  };
</script>

<style>
  #app {
    padding: 20px;
  }

  ._card {
    max-width: 700px;
    border: 1px solid #e9e9e9;
    padding: 15px;
    margin-bottom: 15px;
  }

  ._card-header {
    display: flex;
  }

  ._card-label {
    flex: 1;
  }

  ._card-action {

  }
</style>

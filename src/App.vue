<template>
  <div id="app">
    <div class="_card">
      <el-area-cascader style="width:400px"></el-area-cascader>
    </div>
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
      <el-button :size="size" @click="dialogComponent">组件式弹出层地址编辑</el-button>
      <el-button :size="size" @click="dialog">函数式弹出层地址编辑</el-button>
    </div>
    <div class="_card">
      <p>
        <code>ElAddressDialog</code>默认将<code>data</code>参数解耦，可以通过配置<code>options.bindData = true</code>让对象直接绑定，实现多个弹层间数据各自缓存
      </p>
      <p>
        <el-checkbox v-model="bindData">绑定</el-checkbox>
      </p>
      <el-button :size="size" @click="dialog1">弹出层1</el-button>
      <el-button :size="size" @click="dialog2">弹出层2</el-button>
    </div>
    <div class="_card">
      <el-button :size="size" @click="areaDialog">地区选择</el-button>
    </div>
    <el-address-dialog ref="dialog"></el-address-dialog>
    <el-area-dialog ref="area"/>
  </div>
</template>

<script>
  import {ElementAddress} from './main.js';

  export default {
    name: 'app',
    components: {},
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
        testData: {},
        testData1: {},
        testData2: {},
        bindData: true,
        areaValue: [
          {
            code: '320000',     // 选中的省份编码
            children: [],       // children是空数组表示当前省份全部选中
          },
          {
            code: '350000',     // 选中的省份编码
            children: [         // children非空，值是选中的城市编码
              {code: '350100'},
            ],
          },
        ],
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
      dialogComponent() {
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
      dialog() {
        ElementAddress.$dialog(this.testData, {
          beforeResolve: (data, done) => {
            setTimeout(() => {
              done();
            }, 1000);
          },
          resetButton: true,
        }).then(result => {
          this.testData = {};
          this.$alert(JSON.stringify(result, null, 2), {
            title: '结果',
            dangerouslyUseHTMLString: true,
          });
        });
      },
      dialog1() {
        ElementAddress.$dialog(this.testData1, {
          bindData: this.bindData,
          resetButton: true,
        }).then(result => {
          this.testData1 = {};
          this.$alert(JSON.stringify(result, null, 2), {
            title: '结果1',
            dangerouslyUseHTMLString: true,
          });
        });
      },
      dialog2() {
        ElementAddress.$dialog(this.testData2, {
          bindData: this.bindData,
          resetButton: true,
        }).then(result => {
          this.testData2 = {};
          this.$alert(JSON.stringify(result, null, 2), {
            title: '结果2',
            dangerouslyUseHTMLString: true,
          });
        });
      },
      areaDialog() {
        this.$refs.area.open(this.areaValue).then(res => {
          this.areaValue = res;
          // eslint-disable-next-line no-console
          console.log(res);
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
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  ._card-header {
    display: flex;
  }

  ._card-label {
    flex: 1;
  }

  ._card p {
    margin-bottom: 10px;
  }

  code {
    padding: 2px 4px;
    font-size: 90%;
    color: #c7254e;
    background-color: #f9f2f4;
    border-radius: 4px;
  }
</style>

<template>
  <el-form
    ref="form"
    class="el-address_form"
    :size="size"
    :model="data"
    :rules="mRules"
    :label-width="labelWidth"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="mLabels.name" prop="name">
          <el-input
            v-model="data.name"
            :placeholder="mPlaceholders.name"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="mLabels.mobile" prop="mobile">
          <el-input
            v-model.trim="data.mobile"
            :placeholder="mPlaceholders.mobile"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="mLabels.phone" prop="phone">
          <el-input
            v-model="data.phone"
            :placeholder="mPlaceholders.phone"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="mLabels.company" prop="company">
          <el-input
            v-model="data.company"
            :placeholder="mPlaceholders.company"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="mLabels.zip_code" prop="zip_code">
          <el-input
            v-model="data.zip_code"
            :placeholder="mPlaceholders.zip_code"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="mLabels.code" prop="code">
      <el-area-cascader
        v-model="data.code"
        style="width:400px"
        :props="areaProps"
        :placeholder="mPlaceholders.code"
        @change="areaChange"
      />
    </el-form-item>
    <el-form-item :label="mLabels.details" prop="details">
      <el-input
        v-model="data.details"
        type="textarea"
        :autosize="{ minRows: 1 }"
        :placeholder="mPlaceholders.details"
      />
    </el-form-item>
    <slot/>
    <div class="_parse">
      <div class="_parse-body">
        <el-form-item>
          <el-input
            v-model="parse.address"
            type="textarea"
            ref="parse"
            :autosize="{ minRows: 2 }"
            :placeholder="mPlaceholders.parse"
            @paste.native="addressParse"
          />
        </el-form-item>
      </div>
      <div class="_parse-action">
        <el-button :size="size" @click="addressParse">{{ mLabels.parse }}</el-button>
      </div>
    </div>
    <el-form-item
      v-if="parseSelect && parse.results.length > 1"
    >
      <el-collapse
        v-model="parse.actives"
        class="_results">
        <el-collapse-item title="解析出多个地址，如当前数据不对，请展开选择" name="1">
          <el-radio-group
            v-model="parse.index"
            @change="selectResultIndex">
            <el-radio
              v-for="(result, index) in parse.results"
              :key="`${result.code}${index}`"
              :label="index">
              {{ `${result.name}，${result.mobile}，${result.province} ${result.city} ${result.area}
              ${result.details}，${result.zip_code}` }}
            </el-radio>
          </el-radio-group>
        </el-collapse-item>
      </el-collapse>
    </el-form-item>
  </el-form>
</template>
<script>
  import ElAreaCascader from './ElAreaCascader';

  import AddressParse, {Utils} from 'address-parse';

  const KEYS = ['name', 'mobile', 'phone', 'province', 'city', 'area', 'details', 'company', 'zip_code', 'code'];

  export default {
    name: 'ElAddressForm',
    components: {
      ElAreaCascader,
    },
    props: {
      size: {
        type: String,
        default: '',
      },
      labelWidth: {
        type: String,
        default: '80px',
      },
      labels: {
        type: Object,
        default: () => ({}),
      },
      areaProps: Object,
      placeholders: {
        type: Object,
        default: () => ({}),
      },
      data: {
        type: Object,
        default: () => ({
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
        }),
      },
      rules: {
        type: [Object, Boolean],
        default: () => ({}),
      },
      // 是否启用mobile跟phone二选一规则
      rulesMobileEither: {
        type: Boolean,
        default: false,
      },
      assignedBefore: Function,
      parseSelect: {
        type: Boolean,
        default: true,
      },
      parse: {
        type: Object,
        default: () => ({
          address: '',
          results: [],
          index: 0,
          actives: [],
        }),
      },
    },
    computed: {
      mLabels() {
        return {
          name: '姓名',
          mobile: '手机',
          phone: '电话',
          code: '地区',
          details: '地址',
          company: '单位',
          zip_code: '邮编',
          parse: '解 析',
          ...this.labels,
        };
      },
      mPlaceholders() {
        return {
          name: '',
          mobile: '',
          phone: '',
          details: '请输入详细地址',
          company: '',
          zip_code: '',
          code: '省 市 区',
          parse: '此处地址执行解析后会被智能识别',
          ...this.placeholders,
        };
      },
      mRules() {
        if (typeof this.rules === 'object') {
          return Object.assign(
            {},
            this.Rules,
            (this.rulesMobileEither ? this.RulesMobilePhoneEither : {}),
            this.rules,
          );
        } else {
          return {};
        }
      },
    },
    data() {
      return {
        Rules: {
          details: [
            {required: true, message: '请输入详细地址!', trigger: 'change'},
          ],
          name: [
            {required: true, message: '请输入名称!', trigger: 'change'},
          ],
          mobile: [
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  callback();
                } else if (/^[1][0-9]{10}$|^86-[1][0-9]{10}$/.test(value)) {
                  callback();
                } else {
                  callback(new Error('请留空或输入正确的手机号码'));
                }
              }, trigger: 'blur',
            },
          ],
        },
        RulesMobilePhoneEither: {
          mobile:
            {
              validator: (rule, value, callback) => {
                if (!value) {
                  if (!this.data.phone) {
                    callback(new Error('电话号码与手机至少要填写一项'));
                  } else {
                    callback();
                  }
                } else if (/^[1][0-9]{10}$|^86-[1][0-9]{10}$/.test(value)) {
                  callback();
                } else {
                  callback(new Error('请留空或输入正确的手机号码'));
                }
              }, trigger: 'blur',
            },
          phone: {
            validator: (rule, value, callback) => {
              Utils.Reg.phone.lastIndex = 0;
              if (!value) {
                if (!this.data.mobile) {
                  callback(new Error('电话号码与手机至少要填写一项'));
                } else {
                  callback();
                }
              } else if (Utils.Reg.phone.test(value)) {
                callback();
              } else {
                callback(new Error('请留空或输入正确的电话号码'));
              }
            }, trigger: 'blur',
          },
        },
      };
    },
    methods: {
      validate(callback) {
        this.$refs.form.validate(callback);
      },
      clear() {
        KEYS.forEach(key => {
          this.data[key] = '';
        });
        this.$nextTick(() => {
          this.clearValidate();
        });
        this.parse.address = '';
        this.parse.actives = [];
        this.parse.results = [];
        this.parse.index = 0;
      },
      clearValidate(props) {
        this.$refs.form.clearValidate(props);
      },
      areaChange(code, [province, city, area]) {
        this.data.province = province ? province.label : '';
        this.data.city = city ? city.label : '';
        this.data.area = area ? area.label : '';
      },
      addressParse() {
        this.parse.actives = [];
        this.parse.results = [];
        this.parse.index = 0;
        this.$nextTick(() => {
          setTimeout(() => {
            if (!this.parse.address) return false;
            this.clearValidate();
            this.parse.results = AddressParse.parse(this.parse.address);
            let result = this.parse.results[0];
            if (result) {
              this.assignedBefore && this.assignedBefore(result);
              KEYS.forEach(key => {
                // 后解析的空值不覆盖前值
                if (result[key]) {
                  this.data[key] = result[key];
                }
              });
            }
            this.$emit('parse', this.parse.results);
          }, 100);
        });
      },
      selectResultIndex(index) {
        const result = this.parse.results[index];
        this.assignedBefore && this.assignedBefore(result);
        KEYS.forEach(key => {
          this.data[key] = result[key];
        });
      },
    },
  };
</script>
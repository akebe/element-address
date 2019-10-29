import {AREA} from 'address-parse';

/**
 * 把地址数据转换为el-cascader能解析的数据 400ms
 * @param province_list Object
 * @param city_list Object
 * @param area_list Object
 * @param opt
 * @returns {{options: Array, codes}}
 * options el-cascader.options
 * codes {code: [province_code, city_code, area_code]} 用来对应options的value
 */
function getAreaCascaderOptions({province_list = {}, city_list = {}, area_list = {}} = {}, opt = {}) {
  const _opt = Object.assign({
    value: 'value',
    label: 'label',
    children: 'children',
  }, opt);
  const options = [],
    codes = {};
  for (let _code in province_list) {
    const province = province_list[_code],
      _province = {
        [_opt.value]: _code,
        [_opt.label]: province,
        [_opt.children]: [],
      };
    codes[_code] = [_province[_opt.value]];
    _code = _code.substr(0, 2);
    for (let _code_city in city_list) {
      if (_code_city.indexOf(_code) === 0) {
        let city = city_list[_code_city],
          _city = {
            [_opt.value]: _code_city,
            [_opt.label]: city,
            [_opt.children]: [],
          },
          isCityArea = city.indexOf('直辖县') > -1,
          isMergeArea = city === '县';
        codes[_code_city] = [_province[_opt.value], _city[_opt.value]];
        _code_city = _code_city.substr(0, 4);
        for (let _code_area in area_list) {
          if (_code_area.indexOf(_code_city) === 0) {
            let area = area_list[_code_area],
              _area = {
                [_opt.value]: _code_area,
                [_opt.label]: area,
              };
            if (isCityArea) {
              _province.children.push(_area);
              codes[_code_area] = [_province[_opt.value], _area[_opt.value]];
            } else if (isMergeArea) {
              _province[_opt.children][0][_opt.children].push(_area);
              codes[_code_area] = [_province[_opt.value], _province[_opt.children][0][_opt.value], _area[_opt.value]];
            } else {
              _city[_opt.children].push(_area);
              codes[_code_area] = [_province[_opt.value], _city[_opt.value], _area[_opt.value]];
            }
          }
        }
        if (!_city[_opt.children].length) {
          delete _city[_opt.children];
        }
        !isCityArea && !isMergeArea && _province[_opt.children].push(_city);
      }
    }
    if (!_province[_opt.children].length) {
      delete _province[_opt.children];
    }
    options.push(_province);
  }
  return {
    options,
    codes,
  };
}

const {options, codes} = getAreaCascaderOptions(AREA);

export {getAreaCascaderOptions};

export default {
  options,
  codes,
};

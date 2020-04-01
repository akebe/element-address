import {Utils, AREA} from 'address-parse';

const areas = AREA.district_list.map(v => ({
  code: v.label,
  name: v.label,
  children: Object.keys(v.data).map(province_code => ({
      code: province_code,
      name: AREA.province_list[province_code],
      children: Utils.getTargetAreaListByCode('city', province_code),
    }),
  ),
}));

export default areas;
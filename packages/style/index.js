let init = false;
export default () => {
  if (init) return false;
  let a = '.el-address_form',
    b = '.el-radio_hide',
    style = `${a} ._parse{display:-webkit-box;display:-ms-flexbox;display:flex}${a} ._parse-body{-webkit-box-flex:1;-ms-flex:1;flex:1}${a} ._parse-action{margin-left:15px}${a} ._results .el-radio{white-space:normal;display:block;margin-bottom:10px}${a} ._results .el-radio__label{font-size:13px}${a} ._results .el-collapse-item__header{color:#e6a23c}${b} .el-radio__inner{border:0;background-color:inherit}${b} .el-radio__input.is-checked .el-radio__inner{background:none}${b} .el-radio{height:100%;width:150px;position:absolute}`,
    el = document.createElement('STYLE');
  el.type = 'text/css';
  el.innerHTML = style;
  document.head.appendChild(el);
  init = true;
}

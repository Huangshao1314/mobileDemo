import Vue from 'vue'
import Big from 'big.js'

const ACCOUNT = {}

/**
 * @param {Number} account 金额数字
 * @returns {String} 大写金额
 */
ACCOUNT.digitUppercase = (acount) => {
  let act = !(acount === undefined || acount === null) ? acount.toString() : ''
  if (!act || !/^\d*([.]\d+)?$/.test(act)) {
    return ''
  }
  act = parseFloat(act).toString()
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整';
  // 整型完以后的单位
  let cnIntLast = '元';
  // 最大处理的数字
  let maxNum = 999999999999999.9999;
  // 金额整数部分
  let integerNum;
  // 金额小数部分
  let decimalNum;
  // 输出的中文金额字符串
  let chineseStr = '';
  // 分离金额后用的数组，预定义
  let parts;
  let money = parseFloat(act);
  if (money >= maxNum) {
    // 超出最大处理数字
    return '';
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }
  // 转换为字符串
  money = money.toString();
  if (money.indexOf('.') === -1) {
    integerNum = money;
    decimalNum = '';
  } else {
    parts = money.split('.');
    integerNum = parts[0];
    decimalNum = parts[1].substr(0, 4);
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0;
    let IntLen = integerNum.length;
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1);
      let p = IntLen - i - 1;
      let q = p / 4;
      let m = p % 4;
      if (n == '0') {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0];
        }
        // 归零
        zeroCount = 0;
        chineseStr += cnNums[parseInt(n, 10)] + cnIntRadice[m];
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q];
      }
    }
    chineseStr += cnIntLast;
  }
  // 小数部分
  if (decimalNum != '') {
    let decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1);
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger;
  } else if (decimalNum == '') {
    chineseStr += cnInteger;
  }
  return chineseStr;
}

/**
 * @param {String} m 入参金额数字
 * @param {Number} n 保留小数位
 * @returns {String} 返回千分位后的数字格式，只截取后n位小数
 */
ACCOUNT.fmoney = function(m, n = 2) {
  let p = !(m === undefined || m === null) ? m.toString() : ''
  if (!p || !/^\d*([.]\d+)?$/.test(p) || parseInt(n, 10) < 0) {
    return p
  }
  p = parseFloat(p).toString()
  let num = parseInt(n, 10)
  let mInt = p.split('.')[0]; let mDeci = p.split('.')[1] || ''
  mInt = mInt.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => {
    return s + ','
  })
  let len = mDeci.length
  mDeci = len < num ? mDeci + Array(num - len + 1).join('0') : mDeci.slice(0, num)
  return num === 0 ? mInt : (mInt + '.' + mDeci)
}

/**
 * @param {String} m 入参金额数字
 * @returns {String} 去掉非数字后的金额数字
 */
ACCOUNT.rmoney = function(m) {
  let e = !(m === undefined || m === null) ? m.toString() : '0'
  return parseFloat(e.replace(/[^\d\\.]/g, ""))
}

/**
 * @param {Number} number：要格式化的数字
 * @param {Number} decimals：保留几位小数
 * @param {String} dec_point：小数点符号
 * @param {String} thousands_sep：千分位符号
 * @returns {String} 格式化金额数字，有四舍五入
 * ACCOUNT.moneyFormat(1234567.089, 2, ".", ",") // "1,234,567.09"
 */
ACCOUNT.moneyFormat = (number, decimals, dec_point, thousands_sep) => {
  number = (String(number)).replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(Number(number)) ? 0 : Number(number);
  let prec = !isFinite(Number(decimals)) ? 0 : Math.abs(decimals);
  let sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
  let dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  let s = '';
  let toFixedFix = function(a, b) {
    let k = Math.pow(10, b);
    return String(Math.ceil(a * k) / k);
  };

  s = (prec ? toFixedFix(n, prec) : String(Math.round(n))).split('.');
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @param {Number} number：要格式化的数字
 * @param {Number} decimals：保留几位小数
 * @param {String} dec_point：小数点符号
 * @param {String} thousands_sep：千分位符号
 * @returns {String} 格式化金额数字，直接截取而非四舍五入
 * ACCOUNT.moneyPFormat(1234567.089, 2, ".", ",") // "1,234,567.08"
 */
ACCOUNT.moneyPFomat = (number, decimals, dec_point, thousands_sep) => {
  number = (String(number)).replace(/[^0-9+-Ee.]/g, '');
  let n = !isFinite(Number(number)) ? 0 : Number(number);

  let prec = !isFinite(Number(decimals)) ? 0 : Math.abs(decimals);
  let sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
  let dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
  let s = '';
  let toFixedFix = function(a, b) {
    let k = Math.pow(10, b);
    return String(Math.floor(a * k) / k);
  };
  s = (prec ? toFixedFix(n, prec) : String(Math.floor(n))).split('.');
  let re = /(-?\d+)(\d{3})/;
  console.log(s)
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @returns {null} 金额正则校验
 */
ACCOUNT.validMoney = (m) => {
  let e = !(m === undefined || m === null) ? m.toString() : ''
  return /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/.test(e)
}
/**
 * @param {Array} arr 数字类型数字
 * @returns {Big} 返回金额数组累加后的值，用大数相加去掉浮点型带来的误差
 */
ACCOUNT.sum = function(arr) {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    return new Big('0.00')
  }
  let resBig = new Big('0.00')
  arr.forEach(element => {
    resBig = resBig.plus(element.toString())
  });
  return resBig
}

Object.defineProperties(Vue.prototype, {
  $ACCOUNT: {
    get() {
      return ACCOUNT
    }
  }
})
export default ACCOUNT

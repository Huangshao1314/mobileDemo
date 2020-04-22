import Vue from 'vue'
import i18n from '@/i18n'

const _this = new Vue({ i18n })
/**
 *
 * @param {Object} params 上送参数
 * @return {Null} 登录接口
 */
export const login = (params = {}) => {
  return new Promise((resolve, reject) => {
    _this.$ele.post("login", params).then(res => {
      if (_this.$CU.isSuccess(res)) {
        resolve(_this.$CU.getResData(res))
      } else {
        _this.$alert(_this.getErr(res).message)
        reject({type: 'error', message: _this.getErr(res).message})
      }
    }).catch(err => {
      err;
      reject({type: 'exception', message: err})
    })
  })
}

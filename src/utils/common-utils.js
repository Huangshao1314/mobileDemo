import Vue from 'vue'

const Common = {}
Common.isSuccess = (res) => {
  return Boolean(res.data._isException)
}
Common.getResData = (res) => {
  return res.data.result
}
Common.getErr = (res) => {
  return {
    message: res.data.message,
    code: res.data.code
  }
}
Object.defineProperties(Vue.prototype, {
  $CU: {
    get() {
      return Common
    }
  }
})
export default Common

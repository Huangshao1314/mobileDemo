import Vue from 'vue'

const Common = {}
Common.isSuccess = (res) => {
  return Boolean(res._exception)
}
Common.getResData = (res) => {
  return res.data.result
}
Common.getErr = (res) => {
  return {
    message: res.message,
    code: res.code
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

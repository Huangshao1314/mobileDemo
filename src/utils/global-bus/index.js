let globalBus = {}
globalBus.install = (Vue) => {
  let bus = new Vue()
  Object.defineProperties(bus, {
    on: {
      get() {
        return this.$on.bind(this)
      }
    },
    once: {
      get() {
        return this.$once.bind(this)
      }
    },
    off: {
      get() {
        return this.$off.bind(this)
      }
    },
    emit: {
      get() {
        return this.$emit.bind(this)
      }
    }
  })
  Vue.prototype.$bus = bus
}
export default globalBus

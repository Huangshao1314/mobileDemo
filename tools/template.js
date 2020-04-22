const {pascal} = require('naming-style')
module.exports = {
  componentTemplate: componentName => {
    return `<template>
  <div class="${componentName}">
    ${pascal(componentName)}组件
  </div>
</template>
<script>
export default {
  name: '${pascal(name)}'
}
</script>
<style scoped>
</style>
`
  },
  viewTemplate: componentName => {
    return `<template>
  <div class="${componentName}">
    ${pascal(componentName)}组件
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: '${pascal(componentName)}',
  mixins: [
    ViewMixin()
  ]
}
</script>
<style lang="postcss" scoped>
.${componentName} {

}
</style>
`
  }
}

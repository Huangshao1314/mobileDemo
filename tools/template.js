module.exports = {
  componentTemplate: componentName => {
    const name = componentName.replace(/(\w)(\w*)(-\w)(\w*)/, function(match, p1, p2, p3, p4,) {
      // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      return [p1.toLocaleUpperCase(), p2, p3.substr(1, 1).toLocaleUpperCase(), p4].join('');
    })
    return `<template>
  <div class="${componentName}">
    ${componentName}组件
  </div>
</template>
<script>
export default {
  name: '${name}'
}
</script>
<style scoped>
</style>
`
  },
  viewTemplate: componentName => {
    const name = componentName.replace(/(\w)(\w*)(-\w)(\w*)/, function(match, p1, p2, p3, p4,) {
      // p1 is nondigits, p2 digits, and p3 non-alphanumerics
      return [p1.toLocaleUpperCase(), p2, p3.substr(1, 1).toLocaleUpperCase(), p4].join('');
    })
    return `<template>
  <div class="${componentName}">
    ${componentName}组件
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: '${name}',
  mixins: [
    ViewMixin()
  ]
}
</script>
<style lang="postcss" scoped>
</style>
`
  }
}

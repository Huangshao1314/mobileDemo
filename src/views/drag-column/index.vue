<template>
  <div class="drag-column">
    drag-column组件
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'drag-column',
  mixins: [
    ViewMixin()
  ]
}
</script>
<style lang="postcss" scoped>
.drag-column {

}
</style>

<template>
  <svg :class="svgClass" :aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      return this.iconClass ? `svg-icon ${this.iconClass}` : 'svg-icon'
    }
  }
}
</script>
<style scoped>
.svg-icon{
  fill:currentColor;
  overflow: hidden;
}
</style>

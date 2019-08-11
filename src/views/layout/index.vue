<template>
  <div class="app-wrapper">
    <div class="main-container">
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
  </section>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'layout',
  mixins: [
    ViewMixin()
  ],
  computed: {
    cachedViews() {
      return this.$route.meta.noCache ? this.$route.name : ''
    },
    key() {
      return this.$route.fullPath
    }
  }
}
</script>
<style lang="postcss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  position: relative;
  overflow: hidden;
}
</style>

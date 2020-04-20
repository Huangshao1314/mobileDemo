<template>
  <div class="home">
    <div>
    </div>
    <div>
      <count-down :count="5"></count-down>
    </div>
    <div>
      <svg-page></svg-page>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import CountDown from '@/components/count-down'
import SvgPage from '../svg-page'
export default {
  name: 'home',
  mixins: [
    ViewMixin()
  ],
  components: {
    CountDown,
    SvgPage
  },
  data() {
    return {
      svgArr: []
    }
  },
  mounted() {
    // this.$ele.post('login').then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
  },
  methods: {
  }

}
</script>
<style lang="postcss" scoped>

</style>

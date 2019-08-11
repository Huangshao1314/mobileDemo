<template>
  <span class="container" v-if="visible">
    <svg viewBox="25 25 50 50" class="circular">
      <circle cx="50" cy="50" r="20" fill="none" class="path-gray"></circle>
      <circle cx="50" cy="50" r="20" fill="none" class="path" :style="{strokeDashoffset: Dashoffset}"></circle>
    </svg>
    <span class="count">{{time+'s'}}</span>
  </span>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'CountDown',
  mixins: [
    ViewMixin()
  ],
  props: {
    count: {
      type: Number,
      default: 20
    },
    doneClose: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      time: 20,
      Dashoffset: 0, // -126
      interId: '',
      visible: true
    }
  },
  watch: {
    count(v) {
      this.time = v
      if (this.time < 10 && this.time >= 0) {
        this.time = '0' + this.time
      }
    }
  },
  mounted() {
    this.time = this.count
    if (this.time < 10 && this.time >= 0) {
      this.time = '0' + this.time
    }
    this.interId = setInterval(() => {
      this.time--;
      this.Dashoffset = (-126 / this.count) * (this.count - this.time);
      if (this.time < 10 && this.time >= 0) {
        this.time = '0' + this.time
      }
      if (this.time < 0) {
        this.countDone()
        this.time = this.count
      }
      if (this.Dashoffset < -126) {
        this.Dashoffset = 0
      }
    }, 1000)
  },
  methods: {
    countDone() {
      if (this.doneClose) {
        this.visible = false
        clearInterval(this.interId)
      }
      this.$emit('countDone')
    }
  },
  beforeDestroy() {
    clearInterval(this.interId)
  }
}
</script>
<style lang="postcss" scoped>
.cls-1{fill:#e9e9e9;}.cls-2{fill:#4caf50;}
.container{
  position: relative;
  display: inline-block;
  height: 150px;
  width: 150px;
}
.count{
  position: absolute;
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: 30px;
  margin-top: -22px;
  margin-left: -22px;
}
.circular{
  height: 150px;
  width: 150px;
  transform: rotateZ(-90deg);
  -webkit-transform: rotate(-90deg);    /* for Chrome || Safari */
  -moz-transform: rotate(-90deg);       /* for Firefox */
  -ms-transform: rotate(-90deg);        /* for IE */
  -o-transform: rotateZ(-90deg);         /* for Opera */
}
.path{
  stroke-dasharray:150,150;
  stroke-width: 2;
  stroke: #4caf50;
  stroke-linecap: round;
}
.path-gray{
  stroke-dasharray:150,150;
  stroke-width: 2;
  stroke: #e9e9e9;
  stroke-linecap: round;
  stroke-dashoffset:0
}
.container-timing{
  display: inline-block;
  height:150px;
  width:150px;
  position: relative;
  overflow: hidden;
}
</style>

<template>
  <div class="test-demo">
    <div id="flip-list-demo" class="demo">
  <button v-on:click="shuffle">Shuffle</button>
  <ul>
  <transition-group name="flip-list">
    <li v-for="item in items" v-bind:key="item.id" v-show="item.show">
      {{ item.id }}
    </li>
  </transition-group>
  </ul>
</div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
// import shuffle from 'lodash/shuffle'
export default {
  name: 'TestDemo',
  mixins: [
    ViewMixin()
  ],
  components: {
  },
  data: function() {
    return {
      items: [{
        id: "1",
        show: true
      }, {
        id: "2",
        show: false
      }, {
        id: "3",
        show: true
      }, {
        id: "4",
        show: false
      }]
    };
  },
  methods: {
    shuffle: function() {
      this.items.map((item) => {
        item.show = !item.show
      })
    }
  }
}
</script>
<style lang="postcss" scoped>
.test-demo{
  width:100%;
}
.red{
  color:red;
}
</style>
<style lang="postcss">
.tipClass{
  color: red !important;
}
.flip-list-move {
  transition: transform 1s;
}
</style>


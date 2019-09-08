<template>
  <div class="array-response">
    <ul id="example-1">
      <li v-for="(item,index) in items" :key="index">
        {{ item.message }}
      </li>
    </ul>
    <div class="update-test">
      <el-button type="primary" @click="update()">更新数字组</el-button>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'ArrayResponse',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  },
  methods: {
    update() {
      // 以下方法不会监听到数据的变化
      this.items[0] = {message: 'new Foo'} // 不是响应性的
      this.items.length = 1 // 不是响应性的
      // 以下方法可以，方式一、监听到数组对象中的变化，但其实并不是数组元素变化
      this.items[0].message = 'new Foo' // 但仅限于初始化定义过的原对象{ message: 'Foo' }
      // this.items[0] = {message: 'Foo'}; this.items[0].message = 'new Foo' // 这种方式不会监听数组的变化
      // 方式二、 Vue 将被侦听的数组的变异方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：
      // push() pop() shift() unshift() splice() sort() reverse()
      // 但 例如 filter()、concat() 和 slice() 。
      // 它们不会改变原始数组，而总是返回一个新数组。当使用非变异方法时，可以用新数组替换旧数组
      this.items.splice(0, 1, {message: 'new Foo'})
      // 方式三、重新赋值改变指向地址 ，或者cloneDeep
      this.items = [
        { message: 'new Foo' },
        { message: 'new Bar' }
      ]
      // 方式三 Vue.set(vm.items, indexOfItem, newValue)
      this.$set(this.items, 1, {message: ' new Bar'})
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>

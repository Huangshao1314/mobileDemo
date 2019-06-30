<template>
  <div class="test-demo">
    <igtb-ellipsis  style="margin-top:20px">
      使用content属性来决定hover时的提示信息。由placement属性决定展示效果：placement属性值为：方向-对齐位置；
      四个方向：top、left、right、bottom。
    </igtb-ellipsis>
    <igtb-ellipsis content="北京市普陀区金沙江路 1517 弄" style="margin-top:20px">
    </igtb-ellipsis>
    <igtb-ellipsis style="margin-top:20px" popper-class="tipClass">
      <span>
      使用content属性来决定hover时的提示信息。由placement属性决定展示效果：placement属性值为：方向-对齐位置；
      四个方向：top、left、right、bottom。
      </span>
    </igtb-ellipsis>
    <igtb-ellipsis  style="margin-top:20px" class="red">
      <div>
      使用content属性来决定hover时的提示信息。由placement属性决定展示效果：placement属性值为：方向-对齐位置；
      四个方向：top、left、right、bottom。
      </div>
    </igtb-ellipsis>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import IgtbEllipsis from '@/components/igtb-ellipsis'
export default {
  name: 'TestDemo',
  mixins: [
    ViewMixin()
  ],
  components: {
    IgtbEllipsis
  },
  data() {
    return {
      width: 50
    }
  },
  methods: {
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
</style>


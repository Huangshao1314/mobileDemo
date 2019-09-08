<template>
  <div class="reponse-demo">
    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 深入对象响应</span>
        <obj-reponse></obj-reponse>
      </el-tab-pane>
      <el-tab-pane label="消息中心">
        <span slot="label"><i class="el-icon-film"></i> 深入数组响应</span>
        <array-response></array-response>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import ObjReponse from './obj-response'
import ArrayResponse from './array-response'
export default {
  name: 'ReponseDemo',
  mixins: [
    ViewMixin()
  ],
  components: {
    ObjReponse,
    ArrayResponse
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>
<style lang="postcss" scoped>
</style>

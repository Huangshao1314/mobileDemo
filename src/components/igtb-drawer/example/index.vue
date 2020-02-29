<template>
  <div class="example">
    <el-radio-group v-model="direction">
      <el-radio label="ltr">从左往右开</el-radio>
      <el-radio label="rtl">从右往左开</el-radio>
      <el-radio label="ttb">从上往下开</el-radio>
      <el-radio label="btt">从下往上开</el-radio>
    </el-radio-group>
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>
    <igtb-drawer title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :modal="false"
    >
      <span>我来啦!</span>
    </igtb-drawer>
  </div>
</template>
<script>
import IgtbDrawer from '../index.vue'
export default {
  name: 'example',
  components: {
    IgtbDrawer
  },
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(() => {
      //     done();
      //   })
      //   .catch(() => {});
      done();
    }
  }
}
</script>
<style scoped>
</style>

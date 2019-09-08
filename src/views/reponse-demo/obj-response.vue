<template>
  <div class="obj-reponse">
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域" prop="region">
        <el-input v-model="ruleForm.region"></el-input>
      </el-form-item>
      <el-form-item label="活动形式" prop="newProp">
        {{ruleForm.newProp}}
      </el-form-item>
      <el-form-item label="活动方式" prop="newProp">
        {{ruleForm.obj?ruleForm.obj.type:''}}
      </el-form-item>
      <el-form-item label="活动方式" prop="newProp">
        {{ruleForm.obj.pro}}
      </el-form-item>
    </el-form>
    <div class="update-test">
      <el-button type="primary" @click="update()">更新一级对象</el-button>
      <el-button type="primary" @click="update1()">更新二级对象</el-button>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'ObjReponse',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      ruleForm: {
        name: 'default name',
        region: 'default region',
        obj: {pro: 'default obj pro'}
      }
    };
  },
  methods: {
    update() {
      // 以下方式监听不到ruleForm新增属性newProp的变化，或删除属性
      this.ruleForm.newProp = 'new prop'
      delete this.ruleForm.name
      Object.assign(this.ruleForm, {newProp: 'new prop'})
      // 以下方式可以监听到ruleForm新增属性newProp的变化
      // 方式一、改变根节点ruleForm，指向引用地址变了
      // 这种方式常用cloneDeep()
      this.ruleForm = {
        name: 'new name'
      }
      this.ruleForm.newProp = 'new prop'
      // 方式二、assign两种用法，一种加入可监听属性region并引发变化才可以
      // 另一种改变对象地址
      Object.assign(this.ruleForm, {
        region: 'new region', newProp: 'new prop'})
      this.ruleForm = Object.assign({}, this.ruleForm, {
        region: 'new region', newProp: 'new prop'})
      // 方式三、 $set $delete
      this.$set(this.ruleForm, 'newProp', 'new prop')
    },
    update1() {
      // init定义data时 type没有定义
      this.ruleForm.obj.type = 'new type' // 非响应
      this.ruleForm.obj = {type: 'new type'} // 响应
      this.ruleForm = cloneDeep({ name: 'new name',
        region: 'new region',
        obj: {type: 'new type'}}) // 响应
      this.$set(this.ruleForm.obj, 'type', 'new type') // 响应
    }
  }
}
</script>
<style lang="postcss" scoped>
.demo-ruleForm{
  width: 500px;
}
.update-test{
  width:500px;
}
</style>

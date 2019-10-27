<template>
  <div class="scroll-demo">
    <div class="container">
      <el-table
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="Date"
          prop="date">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="name">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="searchWrapper" :style="{transform: 'translate('+translateX+'px,0px)'}">
        <span>测试数据</span>
        <el-button type="primary" round style="float:right;">主要按钮</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'ScrollDemo',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      search: '',
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
      translateX: 0
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    scrollHandle() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft
      if (this.scrollLeft !== scrollLeft) {
        console.log('横向滚动条滚动', scrollLeft)
        this.translateX = scrollLeft
      }
      if (this.scrollTop !== scrollTop) {
        console.log('竖向滚动条滚动')
      }
      this.scrollTop = scrollTop
      this.scrollLeft = scrollLeft
    }
  },
  mounted() {
    window.addEventListener('scroll', this.scrollHandle, false);
    console.log('横向滚动条滚动', this.scrollLeft)
  }
}
</script>
<style lang="postcss" scoped>
.searchWrapper {
  position: fixed;
  left:0;
  right:0;
  top: 10px;
  z-index: 999;
  height: 46px;
  margin: 0 auto;
  text-align: left;
  background: #eee;
  line-height: 46px;
  width: 980px;
  box-shadow: 1px 1px 1px rgb(251, 255, 255);
}
</style>

<template>
  <div class="tran-group">
    <el-row :gutter="20">
      <el-form ref="form" :model="form" label-width="80px">
        <transition-group name="list-complete"
          leave-active-class="animated"
          v-on:leave="leave"
        >
          <el-col :span="6" v-for="(item,index) in conditions" v-bind:key="item.id" v-show="item.show" class="list-complete-item">
            <div class="grid-content bg-purple">
              <el-form-item>
                {{ item.txt}}
                <button v-on:click="shuffle" v-if="index==conditions.length-1">Shuffle</button>
              </el-form-item>
            </div>
          </el-col>
        </transition-group>
      </el-form>
    </el-row>
    <div style="border:1px solid #000;height:60px;"></div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'TranGroup',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      conditions: [{
        id: '1',
        show: true,
        txt: '条件1'
      }, {
        id: '2',
        show: true,
        txt: '条件2'
      }, {
        id: '3',
        show: true,
        txt: '条件3'
      }, {
        id: '4',
        show: true,
        txt: '条件4'
      }, {
        id: '5',
        show: true,
        txt: '条件5'
      }, {
        id: '6',
        show: true,
        txt: '条件6'
      }, {
        id: '7',
        show: true,
        txt: '条件7'
      }],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    shuffle() {
      this.conditions.map((item, index, arr) => {
        if (index > 2 || index + 1 === arr.length) {
          item.show = !item.show
        }
      })
    },
    leave() {
      this.conditions[this.conditions.length - 1].show = !this.conditions[this.conditions.length - 1].show
    }
  }
}
</script>
<style lang="postcss" scoped>
.list-complete-move {
  transition: transform 1s;
}
.flip-list-enter-active{

}
.list-complete-item {
  transition: all 1s;
  /* display: inline-block;
  margin-right: 10px; */
}
.list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-30px);
}
.list-complete-leave-active {
  position: absolute;
}
/* .flip-list-leave-active {
  animation-name: bounceOutLeft;
  /* transition: all 1s ease; */
/*}
*/
@-webkit-keyframes bounceOutLeft {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0);
  }
}

@keyframes bounceOutLeft {
  20% {
    opacity: 1;
    -webkit-transform: translate3d(20px, 0, 0);
    transform: translate3d(20px, 0, 0);
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(-2000px, 0, 0);
    transform: translate3d(-2000px, 0, 0);
  }
}

.bounceOutLeft1 {
  -webkit-animation-name: bounceOutLeft;
  animation-name: bounceOutLeft;
}
/* .flip-list-enter, .flip-list-leave-to{
  height: 0;
} */
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>

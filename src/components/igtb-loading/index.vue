<template>
  <div class="igtb-loading">
    <div class="loading">
      <div class="loading-container" v-if="!isIE9">
        <svg-icon iconClass="icon-loading" className="ele-icon-loading"></svg-icon>
        <div class="circle-box">
          <div class="circle-box1"></div>
          <div class="circle-box2"></div>
          <div class="circle-box3"></div>
        </div>
      </div>
      <!-- svg实现的渐变滚动圆  -->
      <!-- <div class="loading-svg-container" v-if="!isIE9">
        <svg class="icon-loading" id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 150">
          <g id="图层_1-2" data-name="图层 1-2">
            <path class="cls-3" d="M75,21a54,54,0,1,0,54,54A54,54,0,0,0,75,21Zm-6.23,95.91a42.37,42.37,0,0,1,0-83.82V53H60.88A11.63,11.63,0,0,0,49.25,64.62V85.38A11.63,11.63,0,0,0,60.88,97h7.89ZM62.12,85.38a1.23,1.23,0,0,1-1.24-1.22V65.86a1.23,1.23,0,0,1,1.22-1.24H87.88a1.23,1.23,0,0,1,1.24,1.22v18.3a1.23,1.23,0,0,1-1.22,1.24H62.12Zm19.11,31.53V97h7.89a11.63,11.63,0,0,0,11.63-11.62V64.62A11.63,11.63,0,0,0,89.12,53H81.23V33.09a42.37,42.37,0,0,1,0,83.82Z"/>
          </g>
        </svg>
        <svg class="icon-loading circle-box" id="图层_1" data-name="图层 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 150 150">
          <defs>
            <linearGradient id="未命名的渐变" y1="37.5" x2="150" y2="37.5" gradientTransform="translate(0 150) rotate(-90)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#e0e0e0" stop-opacity="0.5"/>
              <stop offset="1" stop-color="#e0e0e0"/>
            </linearGradient>
            <linearGradient id="未命名的渐变_2" y1="107.5" x2="150" y2="107.5" gradientTransform="matrix(0, -1, -1, 0, 220, 150)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#e0e0e0" stop-opacity="0.5"/>
              <stop offset="1" stop-color="#e0e0e0" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <g class="">
              <path class="cls-1" d="M75,145A70,70,0,0,1,75,5"/>
              <path class="cls-2" d="M75,5a70,70,0,0,1,0,140"/>
          </g>
        </svg>
      </div> -->
      <img :src="require('@/assets/img/loading.gif')" alt="" v-else/>
    </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import BrowserUtils from '@/utils/browser-utils'
export default {
  name: 'IgtbLoading',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      isIE9: BrowserUtils.isIE9
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
.icon-loading{
  height:108px;
  width:108px;
  position: absolute;
  left: 22px;
  top: 22px;
  z-index:3;
}
.loading-container{
  height:150px;
  width:150px;
  position: relative;
  display: inline-block;
}
/* svg实现的渐变滚动圆 */
/* .cls-1,.cls-2{fill:none;stroke-miterlimit:10;stroke-width:10px;}
.cls-1{stroke:url(#未命名的渐变);}
.cls-2{stroke:url(#未命名的渐变_2);}
.cls-3{fill:#e9e9e9;}
.loading-svg-container{
  position: relative;
  display: inline-block;
} */
/*旋转动画*/
@keyframes circle {
  0%   {transform:rotate(0deg);}
  100% {transform:rotate(360deg);}
}
.circle-box{
  position: absolute;
  width:150px;
  height:150px;
  left:0;
  top:0;
  animation:circle 1s ease-in-out infinite;
}
.circle-box1{
  position:absolute;
  width: 75px;
  height: 150px;
  border-radius:75px 0 0 75px;
  /* 起始最深颜色为 #dfdfdf，过渡到中间颜色为 #efefef */
  background: linear-gradient(#e0e0e0, #f0f0f0);
}
.circle-box2{
  position:absolute;
  width: 75px;
  height: 150px;
  border-radius:0 75px 75px 0;
  left:50%;
  /* 过渡到中间颜色为 #efefef 最终末尾颜色为 #fbfbfb */
  background: linear-gradient(#ffffff,#f0f0f0);
  z-index:1;
}
.circle-box3{
  position:absolute;
  width:130px;
  height:130px;
  top:10px;
  left:10px;
  border-radius:50%;
  background-color: #fff;
  z-index:2;
}
</style>

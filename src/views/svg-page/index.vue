<template>
  <div class="svg-page">
     <h1 class="logo">
        <a href="https://www.iconfont.cn/" title="iconfont 首页" target="_blank">iconfont</a>
        <a href="https://www.iconfont.cn/manage/index?manage_type=myprojects&amp;projectId=1214287" target="_blank" class="nav-more">查看项目图标</a>
      </h1>
      <hr>
      <ul class="icon_lists dib-box">
        <li class="dib" v-for="(item,index) in svgArr" :key="index">
          <svg-icon :iconClass="item" class="ele-icon-svg"></svg-icon>
          <div class="name">{{item}}</div>
        </li>
      </ul>
      <div class="article">
        <h2 id="unicode-">Unicode 引用</h2>
        <hr>

        <p>Unicode 是字体在网页端最原始的应用方式，特点是：</p>
        <ul>
          <li>兼容性最好，支持 IE6+，及所有现代浏览器。</li>
          <li>支持按字体的方式去动态调整图标大小，颜色等等。</li>
          <li>但是因为是字体，所以不支持多色。只能使用平台里单色的图标，就算项目里有多色图标也会自动去色。</li>
        </ul>
        <blockquote>
          <p>注意：新版 iconfont 支持多色图标，这些多色图标在 Unicode 模式下将不能使用，如果有需求建议使用symbol 的引用方式</p>
        </blockquote>
      </div>
      <div class="article">
        <h2 id="font-class-">font-class 引用</h2>
        <hr>

        <p>font-class 是 Unicode 使用方式的一种变种，主要是解决 Unicode 书写不直观，语意不明确的问题。</p>
        <p>与 Unicode 使用方式相比，具有如下特点：</p>
        <ul>
          <li>兼容性良好，支持 IE8+，及所有现代浏览器。</li>
          <li>相比于 Unicode 语意明确，书写更直观。可以很容易分辨这个 icon 是什么。</li>
          <li>因为使用 class 来定义图标，所以当要替换图标时，只需要修改 class 里面的 Unicode 引用。</li>
          <li>不过因为本质上还是使用的字体，所以多色图标还是不支持的。</li>
        </ul>
      </div>
      <div class="article">
        <h2 id="symbol-">Symbol 引用</h2>
        <hr>

        <p>这是一种全新的使用方式，应该说这才是未来的主流，也是平台目前推荐的用法。相关介绍可以参考这篇<a href="">文章</a>
          这种用法其实是做了一个 SVG 的集合，与另外两种相比具有如下特点：</p>
        <ul>
          <li>支持多色图标了，不再受单色限制。</li>
          <li>通过一些技巧，支持像字体那样，通过 <code>font-size</code>, <code>color</code> 来调整样式。</li>
          <li>兼容性较差，支持 IE9+，及现代浏览器。</li>
          <li>浏览器渲染 SVG 的性能一般，还不如 png。</li>
        </ul>
      </div>
  </div>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
export default {
  name: 'SvgPage',
  mixins: [
    ViewMixin()
  ],
  data() {
    return {
      svgArr: []
    }
  },
  mounted() {
    // 自动生成svg组件图标和库
    const mockContext = require.context('../../components/svg-icon/svgs', true, /.svg$/)
    mockContext.keys().forEach(filepath => {
      let mockModule = mockContext(filepath)
      let props = Object.getOwnPropertyNames(mockModule)
      props.forEach(name => {
        if (name !== '__esModule') {
          this.svgArr.push(mockModule[name].id.slice(5))
        }
      })
    })
    document.title = 'IconFont Demo'
  },
  methods: {
  }
}
</script>
<style lang="postcss" scoped>
a {
  text-decoration: none;
  background-color: transparent;
  color: #333;
}
.svg-page{
  width: 80%;
  margin: 0 auto;
  text-align: left;
}
.logo {
  color: #333;
  text-align: left;
  margin-bottom: 14px;
  line-height: 1;
  overflow: hidden;
  zoom: 1;
  position: relative;
}
.nav-more {
  position: absolute;
  right: 0;
  bottom: -10px;
  height: 42px;
  line-height: 42px;
  color: #666;
  font-size: 14px;
}
.ele-icon-svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: block;
  height: 100px;
  line-height: 100px;
  font-size: 42px;
  margin: 10px auto;
  color: #333;
  -webkit-transition: font-size 0.25s linear, width 0.25s linear;
  -moz-transition: font-size 0.25s linear, width 0.25s linear;
  transition: font-size 0.25s linear, width 0.25s linear;
}
.ele-icon-svg:hover{
  font-size: 100px;
  width:100px;
}
.icon_lists {
  width: 100% !important;
  overflow: hidden;
  zoom: 1;
}
.dib-box {
  letter-spacing: -5px;
  font-size: 0;
}
ul {
  list-style-type: none;
  list-style-image: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
.dib-box .dib {
  vertical-align: top;
  font-size: 12px;
  letter-spacing: normal;
  word-spacing: normal;
  line-height: inherit;
}

.icon_lists li {
  width: 100px;
  margin-bottom: 10px;
  text-align: center;
  list-style: none !important;
  cursor: default;
}
.dib {
  display: inline-block;
  zoom: 1;
}
.icon_lists li .name, .icon_lists li .code-name {
  color: #666;
}
.svg-page {
  color: #666;
  font-size: 14px;
  line-height: 1.8;
}
.svg-page h2 {
  font-size: 22px;
}

.svg-page h2, .svg-page h3, .svg-page h4, .svg-page h5, .svg-page h6 {
  color: #404040;
  margin: 1.6em 0 0.6em 0;
  font-weight: 500;
  clear: both;
}
.svg-page hr {
  height: 1px;
  border: 0;
  background: #e9e9e9;
  margin: 16px 0;
  clear: both;
}

hr {
  box-sizing: content-box;
  height: 0;
}
.svg-page>p, .svg-page>blockquote, .svg-page>.highlight, .svg-page>ol, .svg-page>ul {
  width: 100%;
  text-align: left;
}

.svg-page p {
  margin: 1em 0;
}

.svg-page>ul li, .svg-page blockquote ul>li {
  margin-left: 20px;
  padding-left: 4px;
}

.svg-page ul>li {
  list-style: circle;
}
.svg-page code {
  margin: 0 3px;
  padding: 0 5px;
  background: #eee;
  border-radius: 3px;
}

code, kbd, pre, samp {
  font-family: monaco,menlo,consolas,courier new,courier,monospace;
}
.article ul{
  margin-left: 10px;
}
</style>

<template>
  <el-tooltip class="item" :effect="effect" :content="contentDes" :placement="placement"
    :disabled="disabled" :offset="offset" :popper-class="PopperClass"
  >
    <div class="igtb-ellipsis"
      @mouseenter="handleCellMouseEnter"
    >
      <slot></slot>
      {{$slots.default?'':content}}
    </div>
  </el-tooltip>
</template>
<script>
import ViewMixin from '@/mixins/view-mixins.js'
import {getStyle} from './dom.js'
export default {
  name: 'IgtbEllipsis',
  mixins: [
    ViewMixin()
  ],
  props: {
    content: {
      type: String
    },
    // placement Tooltip的出现位置 String top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
    placement: {
      type: String,
      default: "bottom",
      validator: function(v) {
        return ["top", "top-start", "top-end", "bottom", "bottom-start", "bottom-end", "left", "left-start", "left-end", "right", "right-start", "right-end"].indexOf(v) !== -1
      }
    },
    effect: {
      type: String,
      default: "dark",
      validator: function(v) {
        return ["dark", "light"].indexOf(v) !== -1
      }
    },
    offset: {
      type: Number,
      default: 0
    },
    PopperClass: {
      type: String
    }
  },
  data() {
    return {
      contentDes: '',
      disabled: true
    }
  },
  methods: {
    handleCellMouseEnter(event) {
      // 判断是否text-overflow, 如果是就显示tooltip
      const ellipsis = event.target;
      // use range width instead of scrollWidth to determine whether the text is overflowing
      // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
      const range = document.createRange();
      range.setStart(ellipsis, 0);
      range.setEnd(ellipsis, ellipsis.childNodes.length);
      const rangeWidth = range.getBoundingClientRect().width;
      const padding = (parseInt(getStyle(ellipsis, 'paddingLeft'), 10) || 0) +
        (parseInt(getStyle(ellipsis, 'paddingRight'), 10) || 0);
      if ((rangeWidth + padding > ellipsis.offsetWidth || ellipsis.scrollWidth > ellipsis.offsetWidth)) {
        // 加载tooltip提升
        this.disabled = false
        let text = this.$slots.default && (this.$slots.default[0].text || this.$slots.default[0].elm.innerText);
        this.contentDes = this.content || text;
      } else {
        this.disabled = true;
      }
    }
  },
  mounted() {
    let slot = this.$slots.default;
    if (slot && slot[0].elm && slot[0].elm.style) {
      slot[0].elm.style.display = "inline"
    }
  }
}
</script>
<style lang="postcss" scoped>
.igtb-ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  text-align: left;
}
</style>

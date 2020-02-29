<template>
  <transition-group
    name="igtb-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div class="igtb-drawer__modal" tabindex="0" style="z-index: 1999;" v-show="visible" key="modal" v-if="modal"></div>
    <div
      class="igtb-drawer__wrapper"
      tabindex="-1"
      v-show="visible" key="wrapper" style="z-index: 2000;">
      <div
        class="igtb-drawer__container"
        :class="visible && 'igtb-drawer__open'"
        @click.self="handleWrapperClick"
        role="document"
        tabindex="-1">
        <div
          aria-modal="true"
          aria-labelledby="igtb-drawer__title"
          :aria-label="title"
          class="igtb-drawer"
          :class="[direction, customClass]"
          :style="isHorizontal ? `width: ${size}` : `height: ${size}`"
          ref="drawer"
          role="dialog"
          tabindex="-1"
          >
          <header class="igtb-drawer__header" id="igtb-drawer__title" v-if="withHeader">
            <slot name="title">
              <span role="heading" tabindex="0" :title="title">{{ title }}</span>
            </slot>
            <button
              :aria-label="`close ${title || 'drawer'}`"
              class="igtb-drawer__close-btn"
              type="button"
              v-if="showClose"
              @click="closeDrawer">
              <i class="el-dialog__close el-icon el-icon-close"></i>
            </button>
          </header>
          <section class="igtb-drawer__body" v-if="rendered">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'IgtbDrawer',
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
    /**
     * 关闭前的回调，会暂停 Drawer的关闭function(done)，done 用于关闭 Drawer
     */
    beforeClose: {
      type: Function
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    /**
     * 是否需要遮罩层
     */
    modal: {
      type: Boolean,
      default: true
    },
    /**
     * Drawer 打开的方向
     */
    direction: {
      type: String,
      default: 'rtl',
      validator(val) {
        return ['ltr', 'rtl', 'ttb', 'btt'].indexOf(val) !== -1;
      }
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: '30%'
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    withHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isHorizontal() {
      return this.direction === 'rtl' || this.direction === 'ltr';
    }
  },
  data() {
    return {
      closed: false,
      prevActiveElement: null,
      rendered: true
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.closed = false;
        this.$emit('open');
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.prevActiveElement = document.activeElement;
      } else {
        if (!this.closed) {
          this.$emit('close');
        }
        this.$nextTick(() => {
          if (this.prevActiveElement) {
            this.prevActiveElement.focus();
          }
        });
      }
    }
  },
  methods: {
    afterEnter() {
      this.$emit('opened');
    },
    afterLeave() {
      this.$emit('closed');
    },
    hide(cancel) {
      if (cancel !== false) {
        this.$emit('update:visible', false);
        this.$emit('close');
        if (this.destroyOnClose === true) {
          this.rendered = false;
        }
        this.closed = true;
      }
    },
    handleWrapperClick() {
      if (this.wrapperClosable) {
        this.closeDrawer();
      }
    },
    closeDrawer() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    },
    handleClose() {
      // This method here will be called by PopupManger, when the `closeOnPressEscape` was set to true
      // pressing `ESC` will call this method, and also close the drawer.
      // This method also calls `beforeClose` if there was one.
      this.closeDrawer();
    }
  },
  mounted() {
    if (this.visible) {
      this.rendered = true;
      this.open();
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>
<style lang="postcss" scoped>
.igtb-drawer__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  margin: 0;
}
.igtb-drawer {
  position: absolute;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
  overflow: hidden;
}
.igtb-drawer__container {
  position: relative;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
}
.igtb-drawer__header {
  align-items: center;
  color: #72767b;
  margin-bottom: 32px;
  padding: 20px 20px 0;
  line-height: 24px;
  text-align: left;
}
.igtb-drawer__body {
  padding: 20px;
  text-align: left;
}
.igtb-drawer__modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
}
/* 抽屉样式 */
.igtb-drawer.rtl {
  right: 0;
}
.igtb-drawer.ltr {
  left: 0;
}
.igtb-drawer.ttb {
  top: 0;
}
.igtb-drawer.btt {
  bottom: 0;
}
.igtb-drawer.ltr, .igtb-drawer.rtl {
  height: 100%;
  top: 0;
  bottom: 0;
}
.igtb-drawer.btt, .igtb-drawer.ttb {
  width: 100%;
  left: 0;
  right: 0;
}
.igtb-drawer__close-btn{
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: inherit;
  background-color: transparent;
  float: right;
}
/**抽屉动画效果 */
.igtb-drawer__open .igtb-drawer.rtl {
  animation: rtl-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s;
}
.igtb-drawer.rtl {
  animation: rtl-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;
  right: 0;
}
.igtb-drawer__open .igtb-drawer.ltr {
  animation: ltr-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s;
}
.igtb-drawer.ltr {
  animation: ltr-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;
  left: 0;
}
.igtb-drawer__open .igtb-drawer.ttb {
  animation: ttb-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s;
}
.igtb-drawer.ttb {
  animation: ttb-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;
  top: 0;
}
.igtb-drawer__open .igtb-drawer.btt {
  animation: btt-drawer-in 225ms cubic-bezier(0,0,.2,1) 0s;
}
.igtb-drawer.btt {
  animation: btt-drawer-out 225ms cubic-bezier(0,0,.2,1) 0s;
  bottom: 0;
}
@keyframes rtl-drawer-in {
  0% {
    transform: translate(100%,0);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes rtl-drawer-out {
  0% {
    transform: translate(0,0);
  }
  100% {
    transform: translate(100%,0);
  }
}
@keyframes ltr-drawer-in {
  0% {
    transform: translate(-100%,0);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes ltr-drawer-out {
  0% {
    transform: translate(0,0);
  }

  100% {
    transform: translate(-100%,0);
  }
}
@keyframes ttb-drawer-in {
  0% {
    transform: translate(0,-100%);
  }

  100% {
    transform: translate(0,0);
  }
}
@keyframes ttb-drawer-out {
  0% {
    transform: translate(0,0);
  }

  100% {
    transform: translate(0,-100%);
  }
}
@keyframes btt-drawer-in {
  0% {
    transform: translate(0,100%);
  }
  100% {
    transform: translate(0,0);
  }
}
@keyframes btt-drawer-out {
  0% {
    transform: translate(0,0);
  }
  100% {
    transform: translate(0,100%);
  }
}
</style>

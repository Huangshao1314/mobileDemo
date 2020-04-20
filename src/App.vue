<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import qs from "query-string";
import PQueue from "@/libs/p-queue";
import BrowserUtils from "./utils/browser-utils";
export default {
  name: "app",
  components: {},
  provide() {
    return {
      rootPQueue: this.pqueue
    };
  },
  data() {
    return {
      pqueue: new PQueue({ concurrency: 2, autoStart: true })
    };
  },
  methods: {
    /**
     * 根据url中的queryString设置默认语言
     * queryString的key为local,支持的取值为vue-i18n设置的语言
     * @return {null} null
     */
    changeDefaultLang() {
      let defaultLang = qs.parse(location.searcj)["locale"]
      if (defaultLang) {
        this.$store.dispatch("setLanguage", defaultLang)
        this.$i18n.locale = defaultLang
      }
    }
  },
  beforeMount() {
    this.changeDefaultLang()
  },
  mounted() {
    this.$msgbox.setDefaults({messageQueue: false})
  },
  beforeDestroy() {
    this.$webSocketDisconnect()
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/* body {
  min-width: 980px;
  min-height: 1000px;
  overflow: scroll;
} */
</style>

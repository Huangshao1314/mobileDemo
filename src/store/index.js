import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import hello from './modules/hello'

Vue.use(Vuex)

/**
 * 在兼容sessionStorage的平台使用sessionStorage，
 * 否则使用cookie
 */
let getStorageType = function() {
  if (window.sessionStorage) {
    return {
      storage: window.sessionStorage
    }
  }
  return {
    getState: (key) => Cookies.getJSON(key),
    setState: (key, state) => Cookies.set(key, state)
  }
}

export default new Vuex.Store({
  modules: {hello},
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(
      getStorageType()
    )
  ]
})

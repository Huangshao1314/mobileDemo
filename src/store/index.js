import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

import sharedMutations from 'vuex-shared-mutations'
import hello from './modules/hello'
import app from './modules/app'

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
    setState: (key, state) => Cookies.set(key, state),
    paths: ['app', 'httpError', 'account', 'workbench', 'acountquery']
  }
}

export default new Vuex.Store({
  modules: {hello, app},
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState(
      getStorageType()
    ),
    sharedMutations({predicata: ['SET_ONLINE', 'SET_CALENDAR', 'SET_ISCOMEFROMPOPUP']})
  ]
})

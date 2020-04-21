import Cookie from 'js-cookie'
const app = {
  state: {
    language: Cookie.get('language') || 'zh-CN',
    device: '56456tre',
    platform: '',
    pageNumber: '',
    rsCipherType: '',
    cipherType: '',
    serial: '',
    mac: ''
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
    setLanguage: ({commit}, language) => {
      commit('SET_LANGUAGE', language)
    }
  }
}
export default app

const hello = {
  state: {
    arr: [],
    str: '',
    token: true // 是否登录
  },
  mutations: {
    SET_ARR: (state, arr) => {
      state.arr = arr
    },
    SET_STR: (state, str) => {
      state.str = str
    }
  },
  actions: {
    setArr: ({commit}, arr) => {
      commit('SET_ARR', arr)
    },
    setStr: ({commit}, str) => {
      commit('SET_STR', str)
    }
  }
}
export default hello

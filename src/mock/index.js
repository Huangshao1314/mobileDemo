import Mock from 'mockjs'
const example = require('./inactive/mock.example.js').example
var bfwMocks = [];

// eslint-disable-next-line
console.warn("当前运行时Mock状态!")

/* istanbul ignore next */
function addToMock(list) {
  list.forEach(n => {
    if (n.method) {
      bfwMocks.push(n)
    }
    if (n.path) {
      Mock.mock(n.path, n.data)
    }
  });
}
addToMock(example)

const mockContext = require.context('./active', true, /mock/)
mockContext.keys().forEach(filepath => {
  let mockModule = mockContext(filepath)
  let props = Object.getOwnPropertyNames(mockModule)
  props.forEach(name => {
    if (name !== '__esModule') {
      addToMock(mockModule[name])
    }
  })
})

/* istanbul ignore next */
if (bfwMocks.length !== 0) {
  bfwMocks.forEach(n => {
    Mock.mock('/' + process.env.VUE_APP_BACKEND_NAME + '/_ajax.do?method=' + n.method + '&_local=zh_CN', 'post', function() {
      return n.data
    })
    Mock.mock('/' + process.env.VUE_APP_BACKEND_NAME + '/_ajax.do?method=' + n.method + '&_local=en_US', 'post', function() {
      return n.data
    })
  })
}

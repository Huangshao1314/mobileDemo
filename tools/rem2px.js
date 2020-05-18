/**
 * 将.vue文件中的stlyle标签 中rem单位按照1：10替换为px
 * 使用方法： node tools/rem2px ../src/views/bank-ent-check/check-detaail.vue
 * 会自动提取生产新的css文件在当前文件中
 */
const path = require('path')
const fs = require('fs')
const filePath = path.resolve(__dirname, process.argv.slice(-1)[0])

/**
 * @param {String} str '2rem|2.0rem|0.2rem|.2rem'
 * @return {String} '20px|20px|2px|2px'
 */
function rem2px(str) {
  return str.replace(/(\d*\.?\d*)rem/g, (s, r) => {
    return `${parseFloat(r) * 10}px`
  })
}

fs.readFile(filePath, {encoding: 'utf-8'}, (err, str) => {
  if (err) {
    return
  }
  const styleStr = /<style.+>([\s|\S]+)<\/style>/.exec(str)[1]
  const result = rem2px(styleStr)
  const generateCssPath = path.resolve(filePath, '../fetch.css')
  fs.writeFile(generateCssPath, result, {encoding: 'utf-8'}, error => {
    if (error) {
      throw error
    }
  })
})

module.exports = rem2px

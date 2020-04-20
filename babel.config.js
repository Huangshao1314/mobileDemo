let plugins = []
if (process.env.NODE_ENV === 'production') {
  plugins.push(["transform-remove-console", { "exclude": ["error", "warn"] }])
}

// 只有运行e2e测试的时候才进行测试代码埋点
if (process.env.npm_lifecycle_event === "test:e2e-gui" || process.env.npm_lifecycle_event === "test:e2e") {
  plugins.push(['istanbul', {useInlineSourceMaps: false}])
}
module.exports = {
  presets: [["@vue/cli-plugin-babel/preset", {'useBuiltIns': 'entry'}]],
  plugins: plugins
};

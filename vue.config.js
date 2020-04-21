const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  lintOnSave: true,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  css: undefined,
  transpileDependencies: ['vuedraggable', 'sortablejs'],
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config
    } else {
      // 为开发环境修改配置...
      config.devtool = 'source-map'
    }
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugins.delete('prefetch-index')
    config.plugins.delete('preload-index')
    // 设置内联文件的大小
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        Object.assign(options, {limit: 10240})
      }) // 10kb

    // 设置svg-sprite,在svg规则中排除svg图标
    config.module
      .rule('svg')
      .exclude
      .add(resolve('src/components/svg-icon'))
      .end()

    // 设置svg-sprite,新增svg-sprite处理svg图标
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include
      .add(resolve('src/components/svg-icon')).end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({symbolId: 'icon-[name]'})
      .end()

    /* config.when(process.env.NODE_ENV !== 'development',
      conf => {
        conf.optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            }
          }
        })
      }
    )
    */
    config.when(process.env.IS_ANALYZE,
      conf => {
        conf.plugin('webpack-report')
          .use(BundleAnalyzerPlugin, [{
            analyzerMode: 'static'
          }])
      }
    )
  },
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage/main.js'
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 2000,
    https: false,
    open: false,
    proxy: {
      ['/' + process.env.VUE_APP_BACKEND_NAME + '/']: {
        target: [process.env.VUE_APP_PROXY1],
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^/' + process.env.VUE_APP_BACKEND_NAME]: process.env.VUE_APP_BACKEND_NAME
        }
      },
      ['/' + process.env.VUE_APP_FC_NAME + '/']: {
        target: [process.env.VUE_APP_PROXY2],
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^/' + process.env.VUE_APP_FC_NAME]: process.env.VUE_APP_FC_NAME
        }
      },
      ['/' + process.env.VUE_APP_MC_NAME + '/']: {
        target: [process.env.VUE_APP_PROXY3],
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          ['^/' + process.env.VUE_APP_MC_NAME]: process.env.VUE_APP_MC_NAME
        }
      }
      // '/api': {
      //   target: '<url>',
      //   ws: true,
      //   changeOrigin: true
      // },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  },
  pluginOptions: {
    // 配置第三方插件
    foo: {
      // 插件可以作为 `options.pluginOptions.foo` 访问这些选项。
    }
  }
}

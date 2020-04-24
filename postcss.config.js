module.exports = {
  plugins: {
    "postcss-partial-import": {},
    precss: {},
    "postcss-advanced-variables": {},
    autoprefixer: {},
    // "postcss-pxtorem": {
    //   rootValue: 37.5,
    //   propList: ['*']
    // }

    'postcss-px-to-viewport': {
      viewportWidth: 375,
      viewportUnit: 'vw',
      minPixelValue: 1
    }
  }
}

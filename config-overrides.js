const path = require('path')

module.exports = function override (config) {
  config.resolve = {
    ...config.resolve,
    alias: { '@': path.resolve(__dirname, 'src') }
  }

  // config.module = {
  //   ...config.module,
  //   rules: [
  //     ...config.module.rules,
  //     {
  //       test: /\.styl$/,
  //       exclude: /node_modules/,
  //       use: [
  //         {
  //           loader: 'style-loader' // creates style nodes from JS strings
  //         },
  //         {
  //           loader: 'css-loader' // translates CSS into CommonJS
  //         },
  //         {
  //           loader: 'stylus-loader' // compiles Stylus to CSS
  //         }
  //       ]
  //     }
  //   ]
  // }

  return config
}

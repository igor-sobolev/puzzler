const path = require('path')
const rewireStyl = require('react-app-rewire-stylus-modules')

module.exports = function override (config, env) {
  config.resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }

  rewireStyl(config, env)

  return config
}

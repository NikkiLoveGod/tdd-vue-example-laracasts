const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
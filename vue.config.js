const path = require('path')
module.exports = {
  publicPath: '',
  configureWebpack: {
    resolve: {
      alias: {
        Style: path.resolve(__dirname, 'src/styles/theme.scss')
      }
    }
  }
}
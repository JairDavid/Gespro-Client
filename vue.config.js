module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Gespro'
        return args
      })
  },
  devServer: {
    proxy: 'http://192.168.1.68:2000/'
  }
}
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
    proxy: 'http://52.72.71.229:2000/'
  }
}
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
         @import "~@/assets/sass/prepends.scss";
         @import '~@/assets/sass/main.scss;'
         `
      }
    }
  }
}

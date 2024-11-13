const { defineConfig } = require('@vue/cli-service')
const {resolve} = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay:false
    },
    host: "localhost",
    port:"8081",
    proxy: {
      "^/api": {
        target: "http://yourproductserver.com:8080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {"^/api": ""}
          }
      }
    },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '金融大屏显示平台';
      return args;
    });
  },
  publicPath: './'
})



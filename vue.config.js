// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })
// vue.config.js  
module.exports = {  
  configureWebpack: {  
    resolve: {  
      fallback: {  
        "path": require.resolve("path-browserify")  
      }  
    }  
  }  
}
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // Enable linting on save
  lintOnSave: true,

  // Configure webpack
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },

  // Development server configuration
  devServer: {
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  // Transpile dependencies
  transpileDependencies: [
    'vuetify',
  ],

  // CSS-related options
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/styles/variables.scss";`
      },
    },
  },

  // PWA plugin options
  pwa: {
    name: 'My Vue App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#42B883',
    },
  },

  // Plugin options for third-party plugins
  pluginOptions: {
    // Example: vue-cli-plugin-apollo configuration
    apollo: {
      lintGQL: true,
    },
  },
})

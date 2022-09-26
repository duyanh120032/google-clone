const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      require('unplugin-vue-components/webpack')({
        dts: 'src/components.d.ts',
      }),
      require('unplugin-auto-import/webpack')({
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: 'src/auto-imports.d.ts',
      }),
    ],
  },
})

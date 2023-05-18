import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { compilerOptions, transformAssetUrls } from 'vue3-pixi'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions,
        transformAssetUrls,
      },
    }),
  ],
})

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import importElementPlus from 'vite-plugin-element-plus';
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        // refTransform: true
      }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    importElementPlus({
      useSource: true
    }),
  ],
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import "/assets/stylus/variable.styl";`,
      }
    }
  }
});

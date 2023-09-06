import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import importElementPlus from 'vite-plugin-element-plus';
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path';
import dts from 'vite-plugin-dts'
import ElementPlus from 'unplugin-element-plus/vite'
import { writeFileSync } from 'fs';
import { resolve, join } from 'path';
import VueTypeImports from 'vite-plugin-vue-type-imports'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: [
        'packages/index.ts'
      ]
    }),
    vue(
      {
        // refTransform: true
      }),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    ElementPlus({
      // options
    }),
    {
      name: 'add-common-js-package-plugin',
      writeBundle(options) {
        if (options.format === 'cjs') {
          writeFileSync(
            join(options.dir, 'package.json'),
            JSON.stringify({ type: 'commonjs' })
          );
        }
      },
    },

  ],
  css: {
    preprocessorOptions: {
      stylus: {
        // additionalData: `@import "/assets/stylus/variable.styl";`,
      }
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: 'pl-element3',
      fileName: (format) => `pl-element3.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        // 'vue',
        // 'element-plus',
        // 'number-precision',
        // 'lodash-es',
        // 'dayjs',
        // 'lodash'
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          // vue: 'Vue',
          // 'element-plus': 'ElementPlus',
          // 'number-precision': 'NP',
          // 'lodash-es': '_',
          // 'dayjs': "dayjs",
          // 'lodash': '_'
        }
      }
    }
  }
});

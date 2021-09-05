import DefaultTheme from 'vitepress/theme'
import { install } from '../../../dist/my-lib.es'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(install)
    app.use(ElementPlus);
    // app.component('VueClickAwayExample', VueClickAwayExample)
  }
}

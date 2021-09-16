import DefaultTheme from 'vitepress/theme'
import { install } from '../../../dist/my-lib.es'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import DemoBlock from "../../components/DemoBlock.vue";
import '../styles/index.styl'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(install)
    app.use(ElementPlus, {
      locale: zhCn,
    });
    // app.component('demo-block', DemoBlock)
    // app.component('VueClickAwayExample', VueClickAwayExample)
  }
}

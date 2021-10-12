import DefaultTheme from 'vitepress/theme'
import { install } from '../../../packages'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
// import DemoBlock from "../../components/DemoBlock.vue";
import '../styles/index.styl'
// import PlElement from 'pl-element3'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
    app.use(install)
    // app.use(PlElement)
    // app.component('demo-block', DemoBlock)
    // app.component('VueClickAwayExample', VueClickAwayExample)
  },
}

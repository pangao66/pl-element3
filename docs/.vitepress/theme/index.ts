import DefaultTheme from 'vitepress/theme'
import { install } from '../../../packages'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// import DemoBlock from "../../components/DemoBlock.vue";
import '../styles/index.styl'
// import PlElement from 'pl-element3'
import Theme from 'vitepress/theme'
// import DynamicLayout from '../components/DynamicLayout.vue'

export default {
  ...Theme,
  // Layout: DynamicLayout,
  enhanceApp({ app }) {
    app.use(ElementPlus, {
      locale: zhCn,
    });
    app.use(install)
  },
}

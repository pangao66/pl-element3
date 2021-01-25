import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
import PlElement from '../packages/index'
import ElementPlus from 'element-plus'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

const app = createApp(App)
app.use(store)
  .use(router)
  .use(ElementPlus, { locale }).use(PlElement)
  .mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-plus/lib/theme-chalk/index.css'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import PlElement from '../packages/index'
import ElementPlus from 'element-plus'

const app = createApp(App)
app.use(store)
  .use(router)
  .use(ElementPlus).use(PlElement)
  .mount('#app')

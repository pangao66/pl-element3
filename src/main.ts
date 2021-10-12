import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import { install } from '../packages'

const app = createApp(App);
app.use(ElementPlus);
app.use(install)
app.use(router);
app.mount('#app');

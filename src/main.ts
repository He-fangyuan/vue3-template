import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router/index'
import 'virtual:svg-icons-register'
import i18n from './lang'
import { createPinia } from "pinia"

const app = createApp(App)
app.use(createPinia())
app.use(i18n);
app.use(router)
app.mount('#app')

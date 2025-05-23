import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

createApp(App).use(vuetify).use(router).mount('#app')

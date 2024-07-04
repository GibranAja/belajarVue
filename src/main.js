import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Firebase
import { auth } from './config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Vue Toastification
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const vuetify = createVuetify({
  components,
  directives,
})

let app;

onAuthStateChanged(auth, () => {
  app = createApp(App)
  const pinia = createPinia()
  
  pinia.use(({ store }) => {
    store.router = markRaw(router)
  })
  
  app.use(createPinia())
  app.use(router)
  app.use(vuetify)
  app.use(Toast)

  app.mount('#app')
})

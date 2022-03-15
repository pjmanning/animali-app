import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createPinia } from 'pinia'
import Notifications from 'notiwind'

import App from './App.vue'
import '@/assets/index.css'

// firebase imports
import { auth } from '@/firebase/config'
import { onAuthStateChanged } from 'firebase/auth'

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from) => {
  let user = auth.currentUser
  // make sure the user is authenticated
  // ❗️ Avoid an infinite redirect
  // redirect the user to the login page
  if (!user && to.name !== 'Login') {
    return { name: 'Login' }
  }
})

let app

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App)
    app.use(router)
    app.use(createPinia())
    app.use(Notifications)
    app.mount('#app')
  }
})

import { createApp } from 'vue'
import App from './App.vue'
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
} from 'vue-router'
import routes from './routes'
import addIcons from './icons'
import { createPinia } from 'pinia'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, fa } from 'vuetify/iconsets/fa'
import '@fortawesome/fontawesome-free/css/all.css'

const pinia = createPinia()

const matrixDarkTheme = {
  dark: true,
  colors: {
    background: '#000000',
    surface: '#000000',
    primary: '#00ff00',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'matrixDarkTheme',
    themes: {
      matrixDarkTheme,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to: RouteLocationNormalized, _, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Mark Metcalfe`
  } else {
    document.title = 'Mark Metcalfe'
  }
  next()
})
router.afterEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (!from.name) {
      to.meta.transition = null
    } else {
      const toDepth = to.path.match(/\/[^/]+?/g)?.length ?? 0
      const fromDepth = from.path.match(/\/[^/]+?/g)?.length ?? 0
      to.meta.transition = fromDepth > toDepth ? 'slide-left' : 'slide-right'
    }
  },
)

createApp(App).use(pinia).use(vuetify).use(addIcons).use(router).mount('#app')

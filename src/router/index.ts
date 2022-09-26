import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// const lazyLoadLayout = (name: string) => () => import(`../layouts/${name}.vue`)
// const lazyLoadView = (name: string) => () => import(`../views/${name}.vue`)
export const lazyLoadView = (viewPath: string, viewFileName = 'index') => {
  if (viewPath.endsWith('.vue')) {
    return () => import(/* webpackChunkName: "[request]" */ `@/views/${viewPath}`)
  }
  else {
    return () =>
      import(/* webpackChunkName: "[request]" */ `../views/${viewPath}/${viewFileName}.vue`)
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: lazyLoadView('AboutView.vue'),
  },
  {
    path: '/search',
    name: 'search',
    component: lazyLoadView('Search'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}


import { Icon } from '@iconify/vue'
import type { App } from 'vue'
export function setUpGlobalComponents(app: App) {
  app.component('Icon', Icon)
}

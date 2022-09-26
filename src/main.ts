import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import { setUpGlobalComponents } from './plugins/setUpGlobalComponents'
import { setupRouter } from './router'
import { setupAssets } from './plugins/assets'

const app = createApp(App)

function setUpPlugins() {
  setUpGlobalComponents(app)
  setupAssets()
}

async function setupApp() {
  await setupRouter(app)
  app.mount('#app')
}
setUpPlugins()
setupApp()

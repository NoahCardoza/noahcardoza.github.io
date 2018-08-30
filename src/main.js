import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import './plugins/markdown.js'
import PortalVue from 'portal-vue'
import AsyncMethods from 'vue-async-methods'


Vue.config.productionTip = false
Vue.use(PortalVue)
Vue.use(AsyncMethods)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import '@/mock/index.js'
Vue.config.productionTip = true
Vue.use(dataV)

new Vue({
  render: h => h(App),
}).$mount('#app')

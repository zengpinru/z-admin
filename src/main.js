import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iview组件
import iView from 'iview'
import '@/assets/less/my-theme.less'

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

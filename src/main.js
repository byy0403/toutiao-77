import Vue from 'vue'
import App from './App.vue'
import '@/style/index.less'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import myCom from '@/components'
Vue.use(myCom)
Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.prototype.$http = axios
new Vue({
  render: h => h(App),
  router
}).$mount('#app')

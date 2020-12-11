import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
Vue.prototype.$axios = axios 
import { Button, Upload, Slider, Switch, Radio  } from 'element-ui';
import 'lib-flexible'

Vue.use(Upload)
Vue.use(Slider)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Radio)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import "./helper/filters"
import 'element-ui/lib/theme-default/index.css'
import './assets/normalize.css'
import './assets/common.css'

Vue.use(Element)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

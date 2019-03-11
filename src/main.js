// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import GeminiScrollbar from 'vue-gemini-scrollbar'
import { Input, Notification, Popover } from 'element-ui'
// 样式引入
import '@/icons'
import '@/assets/publicFonts/fonts.css'
// 全局组件注册
Vue.component(Input.name, Input)
Vue.component(Popover.name, Popover)
Vue.use(GeminiScrollbar)
Vue.prototype.$notify = Notification
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

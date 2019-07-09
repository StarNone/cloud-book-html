// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css' // 引入初始化样式
import 'amfe-flexible/index' // 引入淘宝移动端适配方案
import {fetch} from '@/utils/index' // 引入封装好的axios
import api from '@/utils/api'
import '@/globalcss/init.scss'
import store from '@/store/index'
import '../static/iconfont/iconfont.js'

Vue.config.productionTip = false
Vue.prototype.$axios = fetch // 挂载axios在vue实例上
Vue.prototype.$api = api // 将api挂载到vue实例上
Vue.prototype.$store = store

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

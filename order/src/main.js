// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueProgressBar from 'vue-progressbar'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'
import api from './api'
import store from './vuex/index'
import Vconsole from 'vconsole'
if (process.env.NODE_ENV === 'production') {
  const vconsole = new Vconsole()
  console.log(vconsole)
  console.log('%c 如果你看到这条 log , 说明当前是生产环境', 'font-size:14px;color:#f00;background:#000')
} else {
  console.log('%c 如果你看到这条 log , 说明当前是开发环境', 'font-size:14px;color:#f00;background:#000')
}

Vue.use(api)

Vue.use(Vant)

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

Vue.config.productionTip = false
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PageModel from 'frame-for-h5'

Vue.config.productionTip = false
Vue.use(PageModel.pagemodel)

const vue = new Vue({
  router,
  store,
  render: h => h(App)
});
router.onReady(() => {
  vue.$mount('#app')
})

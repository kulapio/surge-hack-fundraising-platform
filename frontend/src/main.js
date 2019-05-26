import Vue from 'vue'
import App from './App.vue'
import Web3 from 'web3'
import router from '@/router'
import { numberWithComma } from '@/utils/helper'

import '@/assets/main.scss'

const web3 = new Web3(window.web3.currentProvider)

Vue.config.productionTip = false

Vue.prototype.$web3 = web3

Vue.filter('numberWithComma', numberWithComma)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

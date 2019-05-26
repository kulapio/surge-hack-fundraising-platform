import Vue from 'vue'
import Router from 'vue-router'
import Proposals from '@/pages/Proposals'
import Proposal from '@/pages/Proposal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Proposals',
      component: Proposals
    },
    {
      path: '/proposal/:id',
      name: 'Proposal',
      component: Proposal
    }
  ]
})

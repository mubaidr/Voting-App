import Vue from 'vue'
import Router from 'vue-router'

import home from './../../views/home.vue'
import poll from './../../views/poll.vue'
import polls from './../../views/polls.vue'
import pollsAll from './../../views/polls-all.vue'
import pollCreate from './../../views/poll-create.vue'
import register from './../../views/register.vue'
import login from './../../views/login.vue'
import _404 from './../../views/404.vue'

Vue.use(Router)

const router = new Router({
  base: '/Voting-App/',
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: home
  }, {
    path: '/polls',
    component: polls,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/polls-all',
    component: pollsAll
  }, {
    path: '/polls-create',
    component: pollCreate,
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/poll/:id',
    component: poll
  }, {
    path: '/register',
    component: register
  }, {
    path: '/login',
    component: login
  }, {
    path: '/404',
    component: _404
  }, {
    path: '*',
    redirect: '/404'
  }]
})

export default router

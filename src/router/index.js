import Vue from 'vue'
import Router from 'vue-router'


import Home from './home.js';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld,
      redirect: '/app/login'
    },
    {
      path: '/app/login',
      name: 'login',
      component: r => require.ensure([], () => r(require('@/components/home/login'))),
    },
    ...Home
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  base: '/admin',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      component: resolve => require(['@/pages/auth'], resolve),
      children: [
        {
          path: '',
          redirect: 'login',
        },
        {
          path: 'login',
          component: resolve => require(['@/pages/auth/login'], resolve),
        }
      ]
    },
    {
      path: '/navigator',
      component: resolve => require(['@/pages/navigator'], resolve),
      children: [
        {
          path: '',
          redirect: 'home',
        },
        {
          path: 'home',
          component: resolve => require(['@/pages/navigator/home'], resolve),
        },
        {
          path: 'news/:type',
          component: resolve => require(['@/pages/navigator/news'], resolve),
        },
      ],
    }
  ]
})

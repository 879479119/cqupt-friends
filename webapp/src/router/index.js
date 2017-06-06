import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Show from '@/components/Show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/a',
      name: 'A',
      component: Show
    }
  ]
})

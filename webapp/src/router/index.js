import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Show from '@/components/Show'
import Test from '@/components/Test'

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
    },
    {
      path: '/test',
      name: 'A',
      component: Test
    }
  ]
})

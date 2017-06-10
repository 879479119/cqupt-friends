import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Show from '@/components/Show'
import Test from '@/components/Test'
import Depart from '@/components/Depart'
import Spec from '@/components/Spec'
import Student from '@/components/Student'
import Class from '@/components/Class'
import Void from '@/components/Void'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Depart',
      component: Depart
    },
    {
      path: '/depart',
      name: 'Yeah',
      component: Depart
    },
    {
      path: '/specList/:id',
      name: 'Spec',
      component: Spec
    },
    {
      path: '/class/:id',
      name: 'Class',
      component: Class
    },
    {
      path: '/student/:id',
      name: 'Student',
      component: Student
    },
    {
      path: '/:error',
      name: 'A',
      component: Void
    }
  ]
})

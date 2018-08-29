import Vue from 'vue'
import Router from 'vue-router'
import Welcome from './views/Welcome.vue'
import WelcomeIndex from './components/Welcome/Welcome.vue'

Vue.use(Router)
// classes
// projects
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/welcome'
    },
    {
      path: '/welcome',
      component: Welcome,
      children: [
        {
          path: '',
          name: 'welcome',
          component: WelcomeIndex
          // {
          //   render: h => h('div', {}, 'Welcome')
          // }
        },
        {
          path: 'about',
          component: () => import(/* webpackChunkName: "welcome-about" */ './components/Welcome/About.vue')
          // {
          //   render: h => h('div', {}, 'About')
          // }
        },
        {
          path: 'classes/:classId?',
          component: () => import(/* webpackChunkName: "welcome-classes" */ './components/Welcome/Classes.vue')
          // {
          //   render: h => h('div', {}, 'Coming sooner!')
          // }
        },
        {
          path: 'projects',
          component: {
            render: h => h('div', {}, 'Coming soon!')
          }
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

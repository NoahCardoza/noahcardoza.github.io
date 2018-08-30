import Vue from 'vue'
import Router from 'vue-router'

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
      component: () => import(/* webpackChunkName: "welcome" */ './views/Welcome.vue'),
      children: [
        {
          path: '',
          name: 'welcome',
          component:() => import(/* webpackChunkName: "welcome-index" */ './components/Welcome/Welcome.vue')
        },
        {
          path: 'about',
          component: () => import(/* webpackChunkName: "welcome-about" */ './components/Welcome/About.vue')
        },
        {
          path: 'classes/:classId?',
          component: () => import(/* webpackChunkName: "welcome-classes" */ './components/Welcome/Classes.vue')
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

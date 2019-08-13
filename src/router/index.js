import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import store from '@/store'
import Article from '@/views/article'
import Image from '@/views/image'
Vue.use(VueRouter)
var router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          name: 'Welcome',
          component: Welcome
        },
        {
          path: '/article',
          name: 'Article',
          component: Article
        },
        {
          path: '/image',
          name: 'Image',
          component: Image
        }
      ]
    }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !store.getUser().token) {
    return next('/login')
  }
  next()
})
export default router

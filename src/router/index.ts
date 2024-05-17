import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BookView from '../views/BookView.vue'
import PageView from '../views/PageView.vue'
import CustomerView from '../views/CustomerView.vue'
import PurchaseView from '../views/PurchaseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: BookView
    },
    {
      path: '/pages',
      name: 'pages',
      component: PageView
    },
    {
      path: '/customers',
      name: 'customers',
      component: CustomerView
    },
    {
      path: '/purchases',
      name: 'purchases',
      component: PurchaseView
    },
  ]
})

export default router

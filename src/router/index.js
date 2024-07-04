import { useAuthStore } from '@/stores/auth.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/authentication',
      name: 'Authentication',
      component: () => import('../views/AuthForm.vue')
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import('../views/RegForm.vue')
    },
    {
      path: '/recovery',
      name: 'Recovery',
      component: () => import('../views/RecoveryPassForm.vue')
    },
    {
      path: '/cabinet',
      name: 'CabinetPage',
      component: () => import('../views/CabinetPage.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = !!localStorage.getItem('token') || !!authStore.sessionId
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'Authentication' })
    } else {
      next()
    }
  } else if (to.name === 'Authentication' || to.name === 'Registration') {
    if (isAuthenticated) {
      next({ name: 'CabinetPage' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router

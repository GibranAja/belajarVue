// Dashboard Admin
import { createRouter, createWebHistory } from 'vue-router'
import DashBoardView from '../views/DashboardView.vue'
import CategoryView from '../views/CategoryView.vue'
import NewsView from '../views/NewsView.vue'
import ProfileView from '../views/ProfileView.vue'
import HomePublic from '../views/LandingPageView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

// News
import CreateNews from '../views/news/CreateNewsView.vue'
import DetailNews from '../views/news/DetailNewsView.vue'
import UpdateNews from '../views/news/UpdateNewsView.vue'
import DetailNewsPublic from '../views/public/news/DetailNewsPublic.vue'

// Public
import PublicLayout from '../layouts/PublicLayout.vue'
import CategoryPublicView from '../views/public/CategoryView.vue'
import LoginView from '../views/public/LoginView.vue'
import RegisterView from '../views/public/RegisterView.vue'

// Error
import NotFound from '../views/error/NotFoundView.vue'

// Auth
import { auth } from '@/config/firebase'
import { useAuthStore } from '../stores/AuthStore.js'

const requiredAuth = (to, from, next) => {
  const authStore = useAuthStore()
  const userAuth = auth.currentUser

  if (!userAuth) {
    alert("Login/Register diperlukan say")
    next({ name: "Login" })
  } else {
    // Check if the user is admin for admin routes
    if (to.meta.requiresAdmin && !authStore.currentUser?.isAdmin) {
      alert("You don't have permission to access this page")
      next({ name: "HomePublic" })
    } else {
      next()
    }
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // dashboard (admin routes)
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: requiredAuth,
      meta: { requiresAdmin: true },
      children: [
        {
          path: '',
          redirect: {name: "Home"}
        },
        {
          path: './',
          name: 'Home',
          component: DashBoardView
        },
        {
          path: 'news',
          name: 'News',
          component: NewsView
        },
        {
          path: 'news/create',
          name: 'CreateNews',
          component: CreateNews
        },
        {
          path: 'news/:id',
          name: 'DetailNews',
          component: DetailNews
        },
        {
          path: 'news/edit/:id',
          name: 'DetailUpdate',
          component: UpdateNews
        },
        {
          path: 'category',
          name: 'Category',
          component: CategoryView
        },
        {
          path: 'user',
          name: 'User',
          component: ProfileView
        },
      ]
    },
    
    // Public routes
    {
      path: '/',
      component: PublicLayout,
      children: [
        {
          path: '/',
          name: 'HomePublic',
          component: HomePublic
        },
        {
          path: '/Category',
          name: 'CategoryPublic',
          component: CategoryPublicView
        },
        {
          path: '/news/:id',
          name: 'DetailNewsPublic',
          component: DetailNewsPublic
        },
        {
          path: '/Login',
          name: 'Login',
          component: LoginView
        },
        {
          path: '/Register',
          name: 'Register',
          component: RegisterView
        },
      ]
    }, 
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

// Add a global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (authStore.currentUser?.isAdmin) {
      next()
    } else {
      next({ name: 'HomePublic' })
    }
  } else {
    next()
  }
})

export default router
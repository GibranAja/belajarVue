// DashboardAdmin
import { createRouter, createWebHistory } from 'vue-router'
import DashBoardView from '../views/DashboardView.vue'
import CategoryView from '../views/CategoryView.vue'
import NewsView from '../views/NewsView.vue'
import ProfileView from '../views/ProfileView.vue'
import DetailCategory from '../views/DetailCategory.vue'
import HomePublic from '../views/LandingPageView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'

// Public
import PublicLayout from '../layouts/PublicLayout.vue'
import CategoryPublicView from '../views/public/CategoryView.vue'
import LoginView from '../views/public/LoginView.vue'
import RegisterView from '../views/public/RegisterView.vue'

// Error
import NotFound from '../views/error/NotFoundView.vue'

const login = true

const requiredAuth = (to, from, next) => {
  if(!login) {
    alert("Login/Register diperlukan say")
    next({
      name: "Login"
    })
  } else {
    next()
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // dashboard
    {
      path: '/dashboard',
      component: DashboardLayout,
      beforeEnter: requiredAuth,
      children: [
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
          path: 'category',
          name: 'Category',
          component: CategoryView
        },
        {
          path: 'user',
          name: 'User',
          component: ProfileView
        },
        {
          path: 'category/:name',
          name: 'Category-name',
          component: DetailCategory
        }
      ]
    },
    
    // Public
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

export default router

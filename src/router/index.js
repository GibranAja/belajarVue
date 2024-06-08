import { createRouter, createWebHistory } from 'vue-router'
import DashBoardView from '../views/DashboardView.vue'
import CategoryView from '../views/CategoryView.vue'
import NewsView from '../views/NewsView.vue'
import ProfileView from '../views/ProfileView.vue'
import DetailCategory from '../views/DetailCategory.vue'
import LandingPageView from '../views/LandingPageView.vue'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import PublicLayout from '../layouts/PublicLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // dashboard
    {
      path: '/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '',
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
          name: 'LandingPage',
          component: LandingPageView
        }
      ]
    },
  ]
})

export default router

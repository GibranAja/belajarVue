import { createRouter, createWebHistory } from 'vue-router'
import DashBoardView from '../views/DashboardView.vue'
import CategoryView from '../views/CategoryView.vue'
import NewsView from '../views/NewsView.vue'
import ProfileView from '../views/ProfileView.vue'
import DetailCategory from '../views/DetailCategory.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashBoardView
    },
    {
      path: '/news',
      name: 'News',
      component: NewsView
    },
    {
      path: '/category',
      name: 'Category',
      component: CategoryView
    },
    {
      path: '/user',
      name: 'User',
      component: ProfileView
    },
    {
      path: '/category/:name',
      name: 'Category-name',
      component: DetailCategory
    }
  ]
})

export default router

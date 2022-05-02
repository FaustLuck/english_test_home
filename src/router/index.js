import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '@/views/Test.vue'
import StatisticPage from '@/views/Statistic.vue'
import SettingsPage from '@/views/Settings.vue'

const routes = [

  {
    path: '/',
    name: 'test',
    component: TestPage
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: StatisticPage
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

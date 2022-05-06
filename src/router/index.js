import { createRouter, createWebHistory } from 'vue-router'
import TestPage from '@/views/Test.vue'
import StatisticPage from '@/views/Statistic.vue'
import SettingsPage from '@/views/Settings.vue'
import FireshowPage from '@/views/Fireshow.vue'
import LoginPage from '@/views/Login.vue'
import TestResult from '@/components/TestResult.vue'

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
  },
  {
    path: '/result',
    name: 'result',
    component: TestResult
  },
  {
    path: '/fireshow',
    name: 'fireshow',
    component: FireshowPage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

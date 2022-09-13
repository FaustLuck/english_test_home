import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import( "@/views/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    component: () => import( "@/views/ResultView.vue")
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import( "@/views/StatisticView.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import( "@/views/SettingsView.vue")
  },
  {
    path: "/fire-show",
    name: "fire-show",
    component: () => import( "@/views/FireShowView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

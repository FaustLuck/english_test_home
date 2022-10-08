import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "test",
    component:()=>import(/* webpackChunkName: "TestView" */ "@/views/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    component: () => import(/* webpackChunkName: "ResultView" */"@/views/ResultView.vue")
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import(/* webpackChunkName: "StatisticView" */"@/views/StatisticView.vue"),
  },
  {
    path: "/statistic:uid",
    name: "statistic-user",
    props: true,
    component: () => import(/* webpackChunkName: "StatisticUserView" */"@/views/StatisticUserView.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import(/* webpackChunkName: "SettingsView" */"@/views/SettingsView.vue")
  },
  {
    path: "/fire-show",
    name: "fire-show",
    component: () => import(/* webpackChunkName: "AnimationShow" */"@/views/AnimationShow.vue")
  },
  {
    path: "/fail-show",
    name: "fail-show",
    component: () => import(/* webpackChunkName: "AnimationShow" */"@/views/AnimationShow.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

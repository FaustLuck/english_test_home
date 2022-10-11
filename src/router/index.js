import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import(/* webpackChunkName: "TestView" */ "@/views/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    meta: {
      requireAnswers: true
    },
    component: () => import(/* webpackChunkName: "ResultView" */"@/views/ResultView.vue")
  },
  {
    path: "/statistic",
    name: "statistic",
    meta: {
      requireAdmin: true
    },
    component: () => import(/* webpackChunkName: "StatisticView" */"@/views/StatisticView.vue"),
  },
  {
    path: "/statistic:uid",
    name: "statistic-user",
    props: true,
    meta: {
      requireLogin: true
    },
    component: () => import(/* webpackChunkName: "StatisticUserView" */"@/views/StatisticUserView.vue")
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      requireAdmin: true
    },
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


router.beforeEach((to, from, next) => {
  if (to.name === "result" && from.name === "test") {
    next();
    return;
  }
  if (to.name.includes("show") && from.name === "result") {
    next();
    return;
  }
  if (to.meta.requireAdmin) {
    if (store.state.auth.isAdmin) {
      next();
    } else {
      next({name: "statistic-user", params: {uid: store.state.auth.uid}});
    }
    return;
  }
  if (to.meta.requireLogin === store.state.auth.isLogin) {
    next();
    return;
  }
  next();
});


export default router;

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


router.beforeEach(async (to, from) => {
  const isAdmin = store.state.auth.isAdmin;
  const uid = await store.dispatch("auth/getUID") ?? store.state.auth.uid;
  if (to.meta.requireAdmin) {
    if (isAdmin) {
      return true;
    } else {
      if (to.name === "statistic") {
        return uid !== "unauthorizedUser" ? {name: "statistic-user", params: {uid}} : {name: "test"};
      } else {
        return {name: "test"};
      }
    }
  }
  if (to.name === "statistic-user") {
    if (uid === "unauthorizedUser") return {name: "test"};
    return (uid === to.params.uid || isAdmin) ? true : {name: "statistic-user", params: {uid}};
  }
  if (to.name === "result") {
    return (store.state.test.answers) ? true : {name: "test"};
  }
  if (to.name.includes("show")) {
    return (from.name === "result") ? true : {name: "test"};

  }
});

export default router;

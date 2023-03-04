import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import("@/views/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/views/ResultView.vue")
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/views/UsersView.vue"),
  },
  {
    path: "/statistic:sub",
    name: "statistic",
    props: true,
    component: () => import("@/views/StatisticView.vue")
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue")
  },
  {
    path: "/fire-show",
    name: "fire-show",
    component: () => import("@/views/AnimationShow.vue")
  },
  {
    path: "/fail-show",
    name: "fail-show",
    component: () => import("@/views/AnimationShow.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach(async (to) => {
  const {sub} = store.state.auth;
  if (!["test", "result"].includes(to.name) && !sub) return {name: "test"};
  store.commit("setMode", to.name);
  store.commit("setLoading", true);
});

export default router;

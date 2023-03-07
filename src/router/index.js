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
    meta: {requireAuth: true}
  },
  {
    path: "/statistic:sub",
    name: "statistic",
    props: true,
    component: () => import("@/views/StatisticView.vue"),
    meta: {requireAuth: true}
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: {requireAuth: true}
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
  const {result, test} = store.state.test;
  const {sub} = store.state.auth;
  const mode = to.name;
  (mode !== "test") ? store.commit("setLoading", true) : store.commit("setLoading", false);
  store.commit("setMode", mode);
  if (mode === "result" && test === null) return {name: "test"};
  if (result === null && ["fire-show", "fail-show"].includes(mode)) return {name: "test"};
  if (to.meta.requireAuth && sub === null) return {name: "test"};
});

export default router;
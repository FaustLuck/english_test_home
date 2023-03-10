import { createRouter, createWebHistory } from "vue-router";
import { main } from "@/store/main";
import { auth } from "@/store/auth";
import { test } from "@/store/test";

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
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach(async (to) => {
  const {sub} = auth();
  const {result, test} = test();
  const mode = to.name;
  main().setMode(mode);
  main().setLoading(mode !== "test");
  if (mode === "result" && test === null) {
    console.log({mode, test});
    return {name: "test"};
  }
  if (result === null && ["fire-show", "fail-show"].includes(mode)) return {name: "test"};
  if (to.meta.requireAuth && !sub) return {name: "test"};
});

export default router;
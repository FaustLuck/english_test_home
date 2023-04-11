import { createRouter, createWebHistory } from "vue-router";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import { useCommonStore } from "@/store/common";
import { useLoadingStore } from "@/store/loading";

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import("@/pages/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/pages/ResultView.vue"),
    meta: { requireTest: true }
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/UsersView.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/history:sub",
    name: "history",
    props: true,
    component: () => import("@/views/StatisticView.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/fire-show",
    name: "fire-show",
    component: () => import("@/views/AnimationShow.vue"),
    meta: { requireResult: true }
  },
  {
    path: "/fail-show",
    name: "fail-show",
    component: () => import("@/views/AnimationShow.vue"),
    meta: { requireResult: true }
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


router.beforeEach(async (to, from) => {
  if (to.name) useCommonStore().setMode(to.name.toString());
  useLoadingStore().setLoading(to.name !== "test" || from.name === "result");

  if (to.meta.requireAuth) {
    const { sub } = useAuthStore();
    return (sub.length) ? true : { name: "test" };
  }

  if (to.meta.requireTest) {
    const { test } = useTestStore();
    return (test.length) ? true : { name: "test" };
  }

  if (to.meta.requireResult) {
    const { result } = useTestStore();
    return (Object.keys(result).length) ? true : { name: "test" };
  }
});

router.afterEach(async (to) => {
  const { test } = useTestStore();

  if (test.length > 0) {
    (to.name === "result") ? useTestStore().clearTest() : useTestStore().resetTest();
  }
});

export default router;
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
    component: () => import("@/views/ResultView.vue")
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
router.beforeEach(async (to, from) => {
  const { sub } = useAuthStore();
  const { result, test } = useTestStore();
  const toName = to.name && to.name.toString();
  const fromName = from.name;
  if (toName) useCommonStore().setMode(toName);
  useLoadingStore().setLoading(toName !== "test" || fromName === "result");
  if (toName === "result" && test.length === 0) {
    return { name: "test" };
  }
  if (result === null && ["fire-show", "fail-show"].includes(<string>toName)) return { name: "test" };
  if (to.meta.requireAuth && !sub) return { name: "test" };
});

router.afterEach(async (to) => {
  const { test } = useTestStore();
  const toName = to.name && to.name.toString();

  if (test.length > 0) {
    (toName === "result") ? useTestStore().clearTest() : useTestStore().resetTest();
  }
});

export default router;
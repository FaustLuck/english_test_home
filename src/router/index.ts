import { createRouter, createWebHistory } from "vue-router";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import { useCommonStore } from "@/store/common";


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
    path: "/history/:sub/:year",
    name: "history",
    props: true,
    component: () => import("@/pages/HistoryView.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/day/:sub/:day",
    name: "day",
    props: true,
    component: () => import("@/stories/calendar/Day.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/SettingsView.vue"),
    meta: { requireAuth: true }
  },
  {
    path: "/show:nameShow",
    name: "show",
    props: true,
    component: () => import("@/pages/AnimationShow.vue"),
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

router.beforeEach(async (to) => {
  if (to.name) useCommonStore().setMode(to.name.toString());

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
import { createRouter, createWebHistory } from "vue-router";
import { useTestStore } from "@/store/test";
import { useAuthStore } from "@/store/auth";
import { useCommonStore } from "@/store/common";

import TestView from "@/pages/TestView.vue";
import ResultView from "@/pages/ResultView.vue";
import UsersView from "@/pages/UsersView.vue";
import HistoryView from "@/pages/HistoryView.vue";
import Year from "@/stories/calendar/Year.vue";
import Day from "@/stories/calendar/Day.vue";
import AnimationShow from "@/pages/AnimationShow.vue";

const routes = [
  {
    path: "/",
    name: "test",
    component: TestView
  },
  {
    path: "/result",
    name: "result",
    component: ResultView,
    meta: { requireTest: true }
  },
  {
    path: "/users",
    name: "users",
    component: UsersView,
    meta: { requireAuth: true }
  },
  {
    path: "/history/:sub/",
    name: "history",
    props: true,
    component: HistoryView,
    meta: { requireAuth: true },
    children: [{
      path: "year-:year",
      component: Year,
      name: "year"
    }, {
      path: "day-:timestamp",
      component: Day,
      name: "day"
    }]
  },
  // {
  //   path: "/settings",
  //   name: "settings",
  //   component: () => import("@/views/SettingsView.vue"),
  //   meta: { requireAuth: true }
  // },
  {
    path: "/show:nameShow",
    name: "show",
    props: true,
    component: AnimationShow,
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
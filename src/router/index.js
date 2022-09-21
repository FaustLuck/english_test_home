import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import("@/views/Test.vue"),
  },
  {
    path: "/statistic",
    name: "statistic",
    component: () => import("@/views/Statistic.vue"),
  },
  {
    path: "/settings",
    name: "settings",
    component: () => import("@/views/Settings.vue"),
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/views/Statistic.vue"),
  },
  {
    path: "/fireshow",
    name: "fireshow",
    component: () => import("@/views/Fireshow.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

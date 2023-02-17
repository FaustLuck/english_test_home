import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "test",
    component: () => import("@/views/TestView.vue")
  },
  {
    path: "/result",
    name: "result",
    meta: {
      requireAnswers: true
    },
    component: () => import("@/views/ResultView.vue")
  },
  {
    path: "/users",
    name: "users",
    meta: {
      requireAdmin: true
    },
    component: () => import("@/views/UsersView.vue"),
  },
  {
    path: "/statistic:uid",
    name: "statistic",
    props: true,
    component: () => import("@/views/StatisticView.vue")
  },
  {
    path: "/settings",
    name: "settings",
    meta: {
      requireAdmin: true
    },
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


// router.beforeEach(async (to, from) => {
//   const isAdmin = store.state.auth.isAdmin;
//   const uid = await store.dispatch("auth/getUID") ?? store.state.auth.uid;
//   if (to.meta.requireAdmin) {
//     if (isAdmin) {
//       return true;
//     } else {
//       if (to.name === "users") {
//         return uid !== "unauthorizedUser" ? {name: "statistic", params: {uid}} : {name: "test"};
//       } else {
//         return {name: "test"};
//       }
//     }
//   }
//   if (to.name === "users") {
//     if (uid === "unauthorizedUser") return {name: "test"};
//     return (uid === to.params.uid || isAdmin) ? true : {name: "statistic", params: {uid}};
//   }
//   if (to.name === "result") {
//     return (store.state.test.answers) ? true : {name: "test"};
//   }
//   if (to.name.includes("show")) {
//     return (from.name === "result") ? true : {name: "test"};
//
//   }
// });

export default router;

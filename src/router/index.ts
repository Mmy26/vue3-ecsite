import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/itemList",
      component: () => import("../views/ItemList.vue"),
    },
    {
      path: "/itemDetail/:id",
      component: () => import("../views/ItemDetail.vue"),
    },
    {
      path: "/registerUser",
      name: "RegisterUser",
      component: () => import("../views/RegisterUser.vue"),
    },
  ],
});

export default router;

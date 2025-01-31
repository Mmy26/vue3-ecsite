import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/",
      component: () => import("../views/Top.vue"),
    },
    {
      path: "/cartlist",
      name: "cartlist",
      component: () => import("../views/CartList.vue"),
    },
    {
      path: "/orderConfirm",
      component: () => import("../views/OrderConfirm.vue"),
    },
    {
      path: "/registerUser",
      name: "RegisterUser",
      component: () => import("../views/RegisterUser.vue"),
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
      path: "/itemDetail2/:id",
      component: () => import("../views/ItemDetail2.vue"),
    },
    {
      path: "/registerUser",
      name: "RegisterUser",
      component: () => import("../views/RegisterUser.vue"),
    },
    {
      path: "/logout",
      name: "Logout",
      component: () => import("../views/Logout.vue"),
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/orderHistory",
      component: () => import("../views/OrderHistory.vue"),
    },
    {
      path: "/orderFinished",
      component: () => import("../views/OrderFinished.vue"),
    },
    {
      path: "/inquiryForm",
      component: () => import("../views/InquiryForm.vue"),
    },
    {
      path: "/inquiryComplete",
      component: () => import("../views/InquiryComplete.vue"),
    },
  ],
});

export default router;

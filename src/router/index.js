import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/user/"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/user/Home"),
      },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/admin"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/admin/Home"),
      },
      {
        path: "postulant",
        name: "Postulant",
        component: () => import("../views/admin/Postulante"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/admin/Login"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/consultar",
      name: "consultar",
      component: () => import("../views/ConsultarPeliculas.vue"),
    },
  ],
});

export default router;

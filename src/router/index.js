import Vue from "vue";
import Router from "vue-router";
import Login1 from "@/views/Login/Login1/index.vue";
import Container from "@/container/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "Login1",
      component: Login1
    },
    {
      path: "",
      component: Container,
      redirect: "layout/flow/editor",
      children: [
        {
          path: "layout/flow",
          // component: () => import("@/views/Intergration/Flow/index"),
          component: () => import("@/views/Intergration/Flow/index"),
          name: "flow",
          meta: {
            title: "flow",
            icon: "flow",
            noCache: true,
            affix: true
          },
          children: [
            {
              path: "list/:id",
              component: () => import("@/views/Intergration/Flow/children"),
              name: "flowlist"
            },
            {
              path: "details",
              component: () => import("@/views/Intergration/Flow/children"),
              name: "flowlist"
            },
            {
              path: "editor",
              component: () => import("@/views/Intergration/Flow/children"),
              name: "flowlist"
            }
          ]
        },
        {
          path: "layout/source",
          component: () => import("@/views/Analyze/Source"),
          name: "source",
          meta: {
            title: "source",
            icon: "source",
            noCache: true,
            affix: true
          }
        },
        {
          path: "layout/file",
          component: () => import("@/views/Analyze/File"),
          name: "file",
          meta: {
            title: "file",
            icon: "file",
            noCache: true,
            affix: true
          }
        }
      ]
    }
  ]
});

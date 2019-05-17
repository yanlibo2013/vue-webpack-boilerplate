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
      redirect: "module1/module1-1",
      children: [
        {
          path: "module1/module1-1",
          component: () => import("@/views/module1/module1-1"),
          name: "module1-1",
          meta: {
            title: "module1-1",
            icon: "module1-1",
            noCache: true,
            affix: true
          },
          children: [
            {
              path: "module1-1-1",
              component: () => import("@/views/module1/module1-1/module1-1-1"),
              name: "module1-1-1",
              meta: {
                title: "module1-1-1",
                icon: "module1-1-1",
                noCache: true,
                affix: true
              }
            },
            {
              path: "module1-1-1-1",
              component: () =>
                import("@/views/module1/module1-1/module1-1-1-1"),
              name: "module1-1-1-1",
              meta: {
                title: "module1-1-1-1",
                icon: "module1-1-1-1",
                noCache: true,
                affix: true
              }
            },
            {
              path: "module1-1-1-1-1",
              component: () =>
                import(
                  "@/views/module1/module1-1/module1-1-1-1-1"
                ),
              name: "module1-1-1-1-1",
              meta: {
                title: "module1-1-1-1",
                icon: "module1-1-1-1",
                noCache: true,
                affix: true
              }
            }
          ]
        },
        {
          path: "module1/module1-2",
          component: () => import("@/views/module1/module1-2"),
          name: "module1-2",
          meta: {
            title: "module1-2",
            icon: "module1-2",
            noCache: true,
            affix: true
          }
        },
        {
          path: "module1/module1-3",
          component: () => import("@/views/module1/module1-3"),
          name: "module1-3",
          meta: {
            title: "module1-3",
            icon: "module1-3",
            noCache: true,
            affix: true
          }
        }
      ]
    }
  ]
});

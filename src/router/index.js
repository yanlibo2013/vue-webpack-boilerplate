import Vue from "vue";
import Router from "vue-router";
import Login1 from "@/views/Login/Login1/index.vue";
import Container from "@/container/index";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/html2canvas",
      name: "html2canvas",
      component: () => import("@/test/html2canvas/index")
    },
    {
      path: "/shape",
      name: "shape",
      component: () => import("@/test/css3/index")
    },
    {
      path: "/login",
      name: "Login1",
      component: Login1
    },
    {
      path: "",
      component: Container,
      // redirect: "layout/flow/flowchart",
      // redirect: "layout/flow/canvas",
      redirect: "layout/flow/jsplumbchart",
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
              name: "details"
            },
            {
              path: "editor",
              component: () => import("@/views/Intergration/Flow/children"),
              name: "editor"
            },
            {
              path: "flowchart",
              component: () =>
                import("@/views/Intergration/Flow/template/editor/flowchart"),
              name: "flowchart"
            },
            {
              path: "jsplumbchart",
              component: () =>
                import(
                  "@/views/Intergration/Flow/template/editor/jsplumbchart"
                ),
              name: "jsplumbchart"
            },
            {
              path: "jsplumbhtml2canvas",
              component: () =>
                import(
                  "@/views/Intergration/Flow/template/editor/jsplumbhtml2canvas"
                ),
              name: "jsplumbhtml2canvas"
            },
            {
              path: "canvas",
              component: () =>
                import("@/views/Intergration/Flow/template/editor/canvas"),
              name: "canvas"
            },
            {
              path: "table",
              component: () =>
                import("@/views/Intergration/Flow/table/dataflow/index"),
              name: "table"
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

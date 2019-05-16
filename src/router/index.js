import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Login1 from "@/views/Login/Login1/index.vue";


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login1',
      component: Login1,
    },
  ],
});

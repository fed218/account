import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('./components/Index.vue'),
      children: [
        {
          path: '',
          name: 'Expend',
          component: () => import('./views/Expend.vue'),
        },
        {
          path: 'income',
          name: 'Income',
          component: () => import('./views/Income.vue'),
        },
      ],
    },
  ],
});

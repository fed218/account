import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import axios from 'axios';
import VueAxios from 'vue-axios';

import 'bootstrap';

import 'animate.css/animate.min.css';

import currencyFilter from '@/filters/currency';

import VCharts from 'v-charts'

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueAxios, axios);

Vue.filter('currency', currencyFilter);

Vue.use(VCharts)

Vue.component('Loading', Loading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

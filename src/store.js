import Vue from 'vue';
import Vuex from 'vuex';

import Alert from './store/alert';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Alert,
  },
});

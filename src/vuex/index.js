import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import actions from "./action/index";
import getters from "@/vuex/getters";
import mutations from "./modules/index";
import createPersistedState from 'vuex-persistedstate'


const debug = process.env.NODE_ENV !== "production";
Vue.use(Vuex);


const state = {
};

const vuexPersisted = new createPersistedState({
  key: 'myVuex',
  storage: window.localStorage,
  reducer: state => ({
    navData:state.pk.navData
  }),
  // filter: mutation => (
  //   'CHANGE_LOADING' === mutation.type
  // )
});

const store = new Vuex.Store({
  state,
  actions,
  modules: mutations,
  getters,
  plugins: debug ? [createLogger(), vuexPersisted] : [vuexPersisted]
});

export default store;

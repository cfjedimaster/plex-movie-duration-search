import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    server: ""
  },
  mutations: {
    getUser(state) {
      return state.user;
    },
    setUser(state, u) {
      state.user = u;
    },

    getServer(state) {
      return state.server;
    },
    setServer(state, s) {
      state.server = s;
    }
  }
});

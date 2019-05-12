import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Vuex from "vuex";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

import VueRouter from "vue-router";

import Login from "./components/Login";
import SelectServer from "./components/SelectServer";
import Main from "./components/Main";

import { store } from "./store/store";

Vue.use(Router);
Vue.use(Vuetify);
Vue.use(Vuex);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: Login
    },
    {
      path: "/selectserver",
      component: SelectServer
    },
    {
      path: "/main",
      component: Main
    }
  ]
});

Vue.config.productionTip = false;

Vue.filter("durationDisplay", val => {
  let minutes = Math.floor(val / 1000 / 60);
  return minutes + " minutes";
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");

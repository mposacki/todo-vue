import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/signin");
      }
    }
  },
  { path: "/signup", component: SignUp },
  { path: "/signin", component: SignIn }
];

export default new VueRouter({ mode: "history", routes });

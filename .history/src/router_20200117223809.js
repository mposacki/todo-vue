import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Todos from "./components/todos/Todos";

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
  {
    path: "/signup",
    component: SignUp
  },
  {
    path: "/signin",
    component: SignIn
  },
  {
    path: "/todos",
    component: Todos
  }
];

export default new VueRouter({ mode: "history", routes });

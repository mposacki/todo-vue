import Vue from "vue";
import VueRouter from "vue-router";

import store from "./store";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Todos from "./components/todos/Todos";
import AddList from "./components/todos/AddList";
import ShowList from "./components/todos/ShowList";
import EditList from "./components/todos/EditList";

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
    component: Todos,
    beforeEnter(to, from, next) {
      if (store.state.idToken) {
        next();
      } else {
        next("/signin");
      }
    }
  },
  {
    path: "/todos/:id",
    component: ShowList
  },
  {
    path: "/todos/:id/edit",
    component: EditList
  },
  {
    path: "/todos/addList",
    component: AddList
  }
];

export default new VueRouter({ mode: "history", routes });

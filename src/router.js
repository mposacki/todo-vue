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
import UserProfile from "./components/user/UserProfile";

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
    name: "addTodoList",
    path: "/todos/addList",
    component: AddList
  },
  {
    name: "UserProfile",
    path: "/user-profile",
    component: UserProfile
  }
];

export default new VueRouter({ mode: "history", routes });

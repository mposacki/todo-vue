import Vue from "vue";
import Vuex from "vuex";
import axios from "./axios-auth";
import globalAxios from "axios";

import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      state.userId = userData.userId;
    },
    storeUser(state, user) {
      state.user = user;
    },
    clearAuthData(state) {
      state.idToken = null;
      state.userId = null;
    }
  },
  actions: {
    setLogoutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("clearAuthData");
      }, expirationTime * 1000);
    },
    signup({ commit, dispatch }, authData) {
      axios
        .post("/accounts:signUp?key=AIzaSyDqDIUwP91okUZCVxo9DoTA4x8T5YHD3bc", {
          name: authData.name,
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("storeUser", authData);
          dispatch("setUser", authData.email);
          dispatch("setLogoutTimer", res.data.expiresIn);
          router.replace("/");
        })
        .catch(error => console.log(error));
    },
    login({ commit, dispatch }, authData) {
      axios
        .post(
          "/accounts:signInWithPassword?key=AIzaSyDqDIUwP91okUZCVxo9DoTA4x8T5YHD3bc",
          {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          }
        )
        .then(res => {
          console.log(res.data);
          commit("authUser", {
            token: res.data.idToken,
            userId: res.data.localId
          });
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );
          localStorage.setItem("token", res.data.idToken);
          localStorage.setItem("userId", res.data.localId);
          localStorage.setItem("expirationDate", expirationDate);
          dispatch("setUser", authData.email);
          dispatch("setLogoutTimer", res.data.expiresIn);
          router.replace("/");
        })
        .catch(error => console.log(error));
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      const userId = localStorage.getItem("userId");
      commit("authUser", {
        token: token,
        userId: userId
      });
    },
    logout({ commit }) {
      commit("clearAuthData");
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      router.replace("/signin");
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      let userId = ''
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then(res => {
          userId = res.data.name;
        })
        .catch(error => console.log(error));
    },
    setUser({ commit, state }, email) {
      globalAxios
        .get('/users.json?orderBy="email"&equalTo="' + email + '"')
          .then(res => {
            const userData = res.data[Object.keys(res.data)[0]];
            const user = {
              id: Object.keys(res.data)[0],
              name: userData.name ? userData.name : 'Guest',
              email: userData.email,
            };
            localStorage.setItem("user", user);
            commit('storeUser', user);
          })
          .catch(err => console.log(err));
    },
    getTodos({ state }) {
      const todo = {
        "1": {
          name: "Create todo app",
          status: "done"
        },
        "2": {
          name: "End the game",
          status: "waiting"
        }
      }
      if (state.user) {
        console.log(state.user.id);
      } else {
        // const user = state.user ? state.user : localStorage.getItem("user");
        console.log(localStorage.getItem("user"), state.idToken);
      }
      
      // globalAxios
      //   .patch("/todos/" + state.user.id + ".json" + "?auth=" + state.idToken, todo)
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(error => console.log(error));
      // globalAxios
      //   .get("/todos.json" + "?auth=" + state.idToken + "&print=pretty")
      //   .then(res => console.log(res));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    }
  }
});

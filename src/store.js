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
    user: {
      name: '',
      sex: 'male',
      email: '',
      password: ''
    },
    userTodos: []
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
      state.user = null;
    },
    setUserLists(state, lists) {
      state.userTodos = lists;
    },
    clearUserLists(state) {
      state.userTodos = []
    },
    updateSingleList(state, listObj) {
      console.log(state.userTodos[listObj.id]);
      state.userTodos[listObj.id] = listObj.list;
    },
    removeSingleList(state, index) {
      state.userTodos.splice(index, 1);
    },
    createSingleList(state, list) {
      state.userTodos.push(list);
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
          sex: authData.sex,
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        })
        .then(res => {
          console.log(res);
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
    tryAutoLogin({ commit, dispatch }) {
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
      axios
        .post("/accounts:lookup?key=AIzaSyDqDIUwP91okUZCVxo9DoTA4x8T5YHD3bc", { 'idToken': token })
        .then(res => {
          for (let user of res.data.users) {
            if (user.localId === userId) {
              dispatch("setUser", user.email);
            }
          }
        })
        .catch(error => console.log(error));
      commit("authUser", {
        token: token,
        userId: userId
      });
    },
    logout({ commit }) {
      localStorage.removeItem("expirationDate");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      commit("clearAuthData");
      commit("clearUserLists");
      router.replace("/signin");
    },
    storeUser({ commit, state }, userData) {
      if (!state.idToken) {
        return;
      }
      let userId = '';
      globalAxios
        .post("/users.json" + "?auth=" + state.idToken, userData)
        .then(res => {
          console.log(res.data.name);
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
              sex: userData.sex
            };
            localStorage.setItem("user", user.id);
            commit('storeUser', user);
          })
          .catch(err => console.log(err));
    },
    updateUserProfile({state}, userData) {
      console.log(userData);
    },
    getTodos({ state, getters }) {
      if (state.userTodos.length > 0) {
        return Promise.resolve(state.userTodos)
      }
      return globalAxios
        .get("/todos/" + getters.userIdentifier + ".json" + "?auth=" + state.idToken)
        .then(res => {
          return res.data
        })
        .catch(error => console.log(error));
    },
    setTodos({ state, getters }) {
      const lists = [
        {
          "List test": [
            {
              name: "Create todo app",
              status: true
            },
            {
              name: "End the game",
              status: false
            }
          ]
        },
        {
          "List test 2": [
            {
              name: "Create todo app 2",
              status: false
            },
            {
              name: "End the game 2",
              status: true
            }
          ]
        },
        {
          "List test 3": [
            {
              name: "Create todo app 3",
              status: false
            },
            {
              name: "End the game 3",
              status: true
            }
          ]
        }
      ];
      globalAxios
          .put("/todos/" + getters.userIdentifier + ".json" + "?auth=" + state.idToken, lists)
          .then(res => {
            console.log(res.data)
          })
          .catch(error => console.log(error));
    },
    setUserTodoLists({ commit, dispatch }, lists) {
      commit("setUserLists", lists);
    },
    updateSingleList({ state, commit, getters }, listObj) {
      globalAxios
          .put("/todos/" + getters.userIdentifier + "/" + listObj.id + ".json" + "?auth=" + state.idToken, listObj.list)
          .then(res => {
            commit("updateSingleList", listObj);
            router.replace("/todos");
          })
          .catch(error => console.log(error));
    },
    removeSingleList({ state, commit, getters }, index) {
      globalAxios
          .delete("/todos/" + getters.userIdentifier + "/" + index + ".json" + "?auth=" + state.idToken)
          .then(res => {
            commit('removeSingleList', index);
          })
          .catch(error => console.log(error));
    },
    createSingleList({ state, commit, getters }, list) {
      globalAxios
          .put("/todos/" + getters.userIdentifier + "/" + getters.userTodosLength + ".json" + "?auth=" + state.idToken, list)
          .then(res => {
            commit('createSingleList', list);
            router.replace("/todos");
          })
          .catch(error => console.log(error));
    }
  },
  $touch () {
    validator.$v.$touch()
  },
  getters: {
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.idToken !== null;
    },
    userTodos(state) {
      return state.userTodos;
    },
    userTodosLength(state) {
      return state.userTodos.length;
    },
    userIdentifier(state) {
      let userId = ''
      if (state.user) {
        userId = state.user.id;
      } else {
        userId = localStorage.getItem("user");
      }
      return userId;
    },
    $v (state) {
      return Object.assign({}, validator.$v)
    }
  }
});
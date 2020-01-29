import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import Vuelidate from "vuelidate";

import router from "./router";
import store from "./store";

Vue.use(Vuelidate);

axios.defaults.baseURL = "https://vue-auth-2eea7.firebaseio.com/";
axios.defaults.headers.get["Accepts"] = "application/json";

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});

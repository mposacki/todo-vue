import Vuex from 'vuex'

import UserIcon from "../../src/components/user/UserIcon.vue"

export default {
  title: 'IconUser',
  component: UserIcon,
};

export const Icon = () => ({
  components: { UserIcon },

  template: '<UserIcon v-if="" />',
  store: new Vuex.Store({
    state: {
      user: {
        name: 'Maciej Tester',
        sex: 'female'
      }
    },
    getters: {
      isAuthenticated() {
        return false
      }
    },
  }),
  computed: {
    auth() {
      return store.getters.isAuthenticated;
    }
  }
});

<template>
  <nav class="navigation" role="navigation">
    <ul class="navi">
      <li v-if="!auth" class="navi__item">
        <router-link to="/signup" class="navi__link">Sign Up</router-link>
      </li>
      <li v-if="!auth" class="navi__item">
        <router-link to="/signin" class="navi__link">Sign In</router-link>
      </li>
      <li v-if="auth" class="navi__item">
        <button class="logout navi__link" @click="onLogout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped lang="scss">
.navi {
  list-style-type: none;
  padding-left: 10px;
  font-weight: 700;
  display: flex;

  &__item {
    transition: background-color .3s ease-in-out;
    display: block;
    padding: 5px 10px;
    border-radius: $border-radius;

    &:not(:first-child) {
      padding-left: 10px;
    }

    &:hover {
      background-color: rgba(255, 255, 255, .3);
    }
  }

  &__link {
    color: $light;
    text-decoration: none;
  }
}
.logout {
  background-color: transparent;
  border: none;
  font: inherit;
  color: $light;
  cursor: pointer;
}
</style>

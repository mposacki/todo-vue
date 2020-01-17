<template>
  <header class="header-bar" :style="[auth ? {'border-top-left-radius': '0'} : {'border-top-left-radius': '10px'}]">
    <UserIcon v-if="auth" :user="getUser"/>
    <Navigation />
  </header>
</template>

<script>
import Navigation from "../navi/Navigation";
import UserIcon from "../user/UserIcon";

export default {
  components: {
    Navigation,
    UserIcon
  },
  computed: {
      auth() {
          return this.$store.getters.isAuthenticated;
      },
      getUser() {
          return this.$store.getters.user;
      }
  },
};
</script>

<style scoped lang="scss">
.header-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  min-height: 40px;
  background-image: url("../../assets/dark-red-background.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: repeat;
  padding: 10px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
</style>

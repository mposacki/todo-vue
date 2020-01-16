<template>
  <header class="header-bar" :style="[auth ? {'border-top-left-radius': '0', 'border-bottom-left-radius': '0'} : {'border-top-left-radius': '10px', 'border-bottom-left-radius': '10px'}]">
    <Logo />
    <Navigation />
  </header>
</template>

<script>
import Navigation from "../navi/Navigation";
import Logo from "./Logo"

export default {
  components: {
    Navigation,
    Logo
  },
  computed: {
      auth() {
          return this.$store.getters.isAuthenticated;
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

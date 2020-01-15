<template>
  <header class="header-bar">
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
  }
};
</script>

<style scoped lang="scss">
.header-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  min-height: 40px;
  /*background-image: url("../../assets/dark-red-background.jpg");*/
  /*background-position: center;*/
  /*background-size: cover;*/
  /*background-repeat: repeat;*/
  padding: 10px;
}
</style>

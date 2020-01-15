<template>
  <div id="app">
    <div class="app-container">
      <Sidebar :isAuth="auth"/>
      <div class="app-content">
        <HeaderBar />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from "./components/header/HeaderBar.vue";
import Sidebar from "./components/sidebar/Sidebar";

export default {
  name: "app",
  components: {
    HeaderBar,
    Sidebar
  },
  created() {
    this.$store.dispatch('tryAutoLogin')
  },
  computed: {
      auth() {
          return this.$store.getters.isAuthenticated
      }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Raleway:400,500,700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(0deg, rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)), url("./assets/background-main.jpg");
  background-size: cover;
}

.app-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  border-radius: 10px;
}

.app-content {
  background: linear-gradient(0deg, rgba(255, 255, 255, .45), rgba(255, 255, 255, .45)), url("./assets/light-beige-background.jpg");
  background-size: cover;
  height: 100%;
}

</style>

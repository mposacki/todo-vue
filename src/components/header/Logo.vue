<template>
  <div class="logo-box">
    <router-link to="/">
      <img src="../../assets/dog.svg" alt="Logo image" class="logo" />
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    auth() {
      return this.$store.getters.isAuthenticated
    }
  },
}
</script>

<style lang="scss">
.logo {
  width: 40px;
  height: 40px;

  &-box {
    margin-right: auto;
  }
}
</style>

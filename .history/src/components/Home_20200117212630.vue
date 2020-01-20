<template>
  <div class="home">
    <h1>Welcome to the dashboard!</h1>
  </div>
</template>

<script>
export default {
  created () {
    this.$store.dispatch('createTodos');
  }
}
</script>

<style scoped lang="scss">
  .home {
    padding: 10px;
  }
</style>

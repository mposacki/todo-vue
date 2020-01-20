<template>
  <div class="todos">
    <h1>Todos below</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("getTodos")
  }
}
</script>

<style lang="sass" scoped>

</style>
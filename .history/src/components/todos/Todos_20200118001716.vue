<template>
  <div class="todos">
    <h1 v-if="todos.length > 0">Todos Lists</h1>
    <div else>
      <h1>Create Todo List</h1>
      <button @click="createTodoList" class="todo__button">Create</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: []
    }
  },
  created() {
    this.todos = this.$store.dispatch("getTodos")
  }
}
</script>

<style lang="sass" scoped>
.todo {
  &__button {
    color: white;
  }
}
</style>
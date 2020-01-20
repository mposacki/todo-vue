<template>
  <div class="todos">
    <h1 v-if="todos.length > 0">Todos Lists</h1>
    <div else>
      <h1>Create Todo List</h1>
      <button @click="createTodoList" class="todos__button">Create</button>
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

<style scoped lang="scss">
.todos {
  &__button {
    background: url("../../assets/dark-red-background.jpg") center;
    color: $light;
    font-weight: 700;
    border: none;
    border-radius: $border-radius;
    padding: 10px 20px;
    cursor: pointer;
    transition: background .3s ease-in-out;

    &:hover {
      background: linear-gradient(0deg, rgba(255, 255, 255, .15), rgba(255, 255, 255, .15)), url("../../assets/dark-red-background.jpg") center;
    }

    &:focus,
    &:active {
      outline: none;
      background: linear-gradient(0deg, rgba(0, 0, 0, .15), rgba(0, 0, 0, .15)), url("../../assets/dark-red-background.jpg") center;
    }
  }
}
</style>
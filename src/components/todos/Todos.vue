<template>
  <div class="todos">
    <div v-if="todos.length > 0">
      <h1>Todo Lists</h1>
      <div class="todos__list" v-for="(todo, index) in todos">
        <SingleList :todo="todo" :id="index"/>
      </div>
    </div>
    <div v-else-if="todos.length <= 0">
      <h1>Create Todo List</h1>
    </div>
    <button @click="createTodoList" class="todos__button">Create</button>
  </div>
</template>

<script>
import SingleList from "./SingleList";

export default {
  data() {
    return {
      todos: []
    }
  },
  components: {
    SingleList
  },
  created() {
    this.$store.dispatch("getTodos")
      .then(res => {
          this.todos = res;
          this.$store.dispatch('setUserTodoLists', res);
      });
  },
  methods: {
    createTodoList() {
      this.$store.dispatch("setTodos");
      this.$router.push('/todos/addList');
    }
  }
}
</script>

<style scoped lang="scss">
.todos {
  padding: 10px;

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
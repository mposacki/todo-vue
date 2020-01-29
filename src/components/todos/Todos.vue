<template>
  <div class="todos">
    <div v-if="todoLists.length">
      <h2>Todo Lists</h2>
      <div class="todos__list" v-for="(todo, index) in todoLists">
        <SingleList :todo="todo" :id="index"/>
      </div>
    </div>
    <div v-else>
      <h2>Create Todo List</h2>
    </div>
    <router-link :to="{ path: '/todos/addList', name: 'addTodoList' }" tag="button"
                 class="btn btn__submit todos__button">Create
    </router-link>
  </div>
</template>

<script>
    import SingleList from "./SingleList";

    export default {
        data() {
            return {
                todoLists: []
            }
        },
        components: {
            SingleList
        },
        created() {
            this.$store.dispatch("getTodos")
                .then(res => {
                    if (res !== null) {
                        this.todoLists = res;
                        this.$store.dispatch('setUserTodoLists', res);
                    }
                });
        }
    }
</script>

<style lang="scss">
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

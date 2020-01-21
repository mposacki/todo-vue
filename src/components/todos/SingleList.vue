<template>
  <div class="todo">
    <h3 class="todo__name">{{ getName }}</h3>
    <button class="todo__show" @click="showList">
      <img src="../../assets/show.svg" alt="Show icon" class="todo__icon">
    </button>
    <button class="todo__edit" @click="editList">
      <img src="../../assets/edit.svg" alt="Edit icon" class="todo__icon">
    </button>
    <button class="todo__remove" @click="removeList">
      <img src="../../assets/delete.svg" alt="Remove icon" class="todo__icon">
    </button>
  </div>
</template>

<script>
  import ShowList from "./ShowList";

  export default {
    props: {
      todo: {
        type: Object,
        required: true
      },
      id: {
        type: Number,
        required: true
      }
    },
    computed: {
      getName() {
        return Object.keys(this.todo)[0];
      }
    },
    methods: {
      editList() {
        this.$router.push('/todos/' + (this.id + 1) + '/edit')
      },
      removeList() {
        this.$store.dispatch('removeList', this.id);
      },
      showList() {
        this.$router.push({ path: '/todos/' + (this.id + 1), component: ShowList });
      }
    }
  }
</script>

<style lang="scss" scoped>
.todo {
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(0deg, rgba(0, 0, 0, .45), rgba(0, 0, 0, .45)), url("../../assets/light-beige-background.jpg");
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 300px;
  margin-bottom: 15px;

  &__name {
    margin-right: auto;
    margin-bottom: 0;
    color: #fff;
  }

  &__show,
  &__edit,
  &__remove {
    outline: none;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  &__icon {
    width: 24px;
    height: 24px;
  }
}
</style>
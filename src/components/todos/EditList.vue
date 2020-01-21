<template>
  <div class="edit-single-todo-box">
    <label for="listName">
      <input class="edit-single-todo__heading"
          type="text"
          id="listName"
          v-model="listName"
      />
    </label>
    <div v-for="item in list">
      <div class="edit-single-todo">
        <p class="edit-single-todo__name">{{ item.name }}</p>
        <span :class="[item.status ? 'edit-single-todo__status--done' : 'edit-single-todo__status--waiting']" class="edit-single-todo__status"
              @click="item.status = !item.status"/>
      </div>
    </div>
    <div class="submit">
      <button type="submit" class="edit-single-todo__submit" @click="saveData">Save and return</button>
    </div>
  </div>
</template>

<script>
import TodoStatus from "./TodoStatus";

export default {
  data() {
    return  {
      listObject: {},
      listName: '',
      list: [],
      singleTodoName: ''
    }
  },
  components: {
    TodoStatus
  },
  created() {
    this.listObject = this.$store.state.userTodos[this.$route.params.id - 1];
    this.listName = Object.keys(this.listObject)[0];
    this.list = Object.values(this.listObject)[0];
  },
  methods: {
    saveData() {
      this.$store.dispatch('updateSingleList', {
          id: this.$route.params.id - 1,
          list: {
              [this.listName]: this.list
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-single-todo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    min-width: 250px;

    margin-bottom: 10px;
    padding: 10px;

    background: linear-gradient(0deg, rgba(0, 0, 0, .45), rgba(0, 0, 0, .45)), url("../../assets/light-beige-background.jpg");
    background-size: cover;
    border-radius: 10px;

    &-box {
      padding: 10px;
    }

    &__heading {
      margin-bottom: 10px;
      min-height: 24px;
      border: none;
      background: transparent;
      color: #000;
      font-size: 24px;
      line-height: 1.2;

      &::-webkit-input-placeholder,
      &::-moz-placeholder {
        color: #000;
        font-size: 24px;
        line-height: 1.2;
        opacity: 1;
      }
    }

    &__name {
      color: #fff;
      font-weight: 500;
      margin-bottom: 0;
    }

    &__status {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;
      margin: 0;

      line-height: 0;

      width: 40px;
      height: 40px;

      border: none;
      background: transparent;

      &:after {
        display: block;
        font-weight: 500;
      }

      &--done {
        &:after{
          content: '\2713';

          color: #00ff4e;
          font-size: 24px;
        }
      }
      &--waiting {
        &:after{
          content: '\00D7';

          color: #ff1d17;
          font-size: 40px;
          margin-bottom: 2px;
        }
      }
    }

    &__submit {
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
<template>
  <div class="new-todo-list">
    <h2>Create Todo List</h2>
    <div class="new-todo-list-box">
      <div class="new-todo-form__form-control">
        <label for="listName">Todo List Name: {{ listName }}</label>
        <input class="new-todo-list__input-todo-list-name"
               type="text"
               id="listName"
               v-model="listName"
        />
      </div>
      <div v-for="(item, index) in list">
        <div class="edit-single-todo">
          <p class="edit-single-todo__name">{{ item.name }}</p>
          <span :class="[item.status ? 'edit-single-todo__status--done' : 'edit-single-todo__status--waiting']" class="edit-single-todo__status"
                @click="item.status = !item.status"/>
          <button @click="removeTodo(index)" class="edit-single-todo__remove">
            <img src="../../assets/delete.svg" alt="Delete icon" class="edit-single-todo__icon">
          </button>
        </div>
      </div>
      <div class="new-todo-form">
        <h3 class="new-todo-form__heading">New todo</h3>
        <div class="new-todo-form__form-control">
          <label for="todoName">New todo name</label>
          <input class="new-todo-form__input-name"
                 type="text"
                 id="todoName"
                 v-model="newTodoName"
          />
        </div>
        <div class="new-todo-form__form-control">
          <span>Status</span>
          <span :class="[newTodoStatus ? 'edit-single-todo__status--done' : 'edit-single-todo__status--waiting']" class="edit-single-todo__status"
                @click="newTodoStatus = !newTodoStatus"/>
        </div>
        <div class="new-todo-form__add">
          <button type="button" class="btn btn__submit" @click="addTodo">Add todo</button>
        </div>
      </div>
      <div class="submit">
        <button type="submit" class="btn btn__submit" @click="createSingleList">Save and return</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return  {
      listName: '',
      list: [],
      newTodoName: '',
      newTodoStatus: false
    }
  },
  methods: {
    createSingleList() {
      this.$store.dispatch('createSingleList', {
        [this.listName]: this.list
      })
    },
    removeTodo(index) {
      this.list.splice(index, 1);
    },
    addTodo() {
      this.list.push({
        name: this.newTodoName,
        status: this.newTodoStatus
      });

      this.newTodoName = '';
      this.newTodoStatus = false;
    }
  }
}
</script>

<style lang="scss">
.new-todo-list {
  padding: 10px;

  &-box {
    margin-bottom: 10px;
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
    margin-right: auto;
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

  &__add,
  &__heading{
    flex-basis: 100%;
  }

  &__form-control {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    &:not(:first-of-type) {
      margin-left: 10px;
    }
  }

  &__input-name {
    margin-bottom: 10px;
    min-height: 24px;
    color: #000;
    font-size: 18px;
    line-height: 1.2;
  }

  &__input-todo-list-name {
    margin-bottom: 10px;
    min-height: 24px;
    max-width: 300px;
    color: #000;
    font-size: 18px;
    line-height: 1.2;
  }
}
</style>
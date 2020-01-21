<template>
  <div class="single-todo-box">
    <h1 class="single-todo__heading">{{ getName }}</h1>
    <div v-for="item in getList">
      <div class="single-todo">
        <p class="single-todo__name">{{ item.name }}</p>
        <span :class="[item.status ? 'single-todo__status--done' : 'single-todo__status--waiting']" class="single-todo__status"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import TodoStatus from "./TodoStatus";

    export default {
        data() {
            return  {
                list: {}
            }
        },
        components: {
            TodoStatus
        },
        created() {
            this.list = this.$store.state.userTodos[this.$route.params.id - 1];
        },
        computed: {
            getName() {
                return Object.keys(this.list)[0]
            },
            getList() {
                return Object.values(this.list)[0]
            }
        }
    }

</script>

<style lang="scss" scoped>
  .single-todo {
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
  }
</style>
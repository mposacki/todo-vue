<template>
  <div class="todo">
    <h3 class="todo__name">{{ getName }}</h3>
    <button class="todo__show" @click="showList">
      <img src="../../assets/show.svg" alt="Show icon" class="todo__icon">
    </button>
    <button class="todo__edit" @click="editList">
      <img src="../../assets/edit.svg" alt="Edit icon" class="todo__icon">
    </button>
    <button class="todo__remove" @click="removePopupActive = !removePopupActive">
      <img src="../../assets/delete.svg" alt="Remove icon" class="todo__icon">
    </button>
    <div class="remove-popup" v-if="removePopupActive">
      <div class="remove-popup__content">
        <p class="remove-popup__info">Are you sure ?</p>
        <button type="button" class="btn btn__submit remove-popup__btn" @click="removeList">Yes</button>
        <button type="button" class="btn btn__submit remove-popup__btn" @click="removePopupActive = !removePopupActive">No</button>
      </div>
    </div>
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
    data() {
      return {
        removePopupActive: false
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
        this.removePopupActive = !this.removePopupActive;
        this.$store.dispatch('removeSingleList', this.id);
      },
      showList() {
        this.$router.push({ path: '/todos/' + (this.id + 1), component: ShowList });
      }
    }
  }
</script>

<style lang="scss">
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

.remove-popup {
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .85);

  &__content {
    padding: 10px;
    text-align: center;
    font-weight: 700;
    background-color: $light;
    border-radius: 10px;
  }

  &__btn {
    &:not(:first-of-type) {
      margin-left: 10px;
    }
  }
}
</style>
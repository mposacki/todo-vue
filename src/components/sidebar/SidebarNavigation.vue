<template>
<div class="sidebar__nav-box">
  <nav class="sidebar__nav">
    <ul class="navigation-sidebar">
      <li class="navigation-sidebar__item">
        <img src="../../assets/home.svg" alt="Home icon" class="navigation-sidebar__icon">
        <router-link to="/" class="navigation-sidebar__link">Home</router-link>
      </li>
      <li class="navigation-sidebar__item">
        <img src="../../assets/todos.svg" alt="Home icon" class="navigation-sidebar__icon navigation-sidebar__icon--todos">
        <router-link to="/todos" class="navigation-sidebar__link">Todos</router-link>
      </li>
      <li class="navigation-sidebar__item">
        <img src="../../assets/settings.svg" alt="Home icon" class="navigation-sidebar__icon">
        <router-link to="/user-profile" class="navigation-sidebar__link">User Profile</router-link>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .navigation-sidebar {
    display: flex;
    flex-direction: column;

    margin: 0;
    padding-left: 0;

    list-style-type: none;
    font-weight: 700;

    &__item {
      transition: background-color .3s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 10px;
      border-radius: $border-radius;

      &:hover {
        background-color: rgba(0, 0, 0, .25);
      }
      &:active,
      &:focus {
        background-color: rgba(0, 0, 0, .45);
      }
    }

    &__link {
      color: $dark;
      text-decoration: none;
      margin-left: 8px;
    }

    &__icon {
      width: 32px;
      height: 32px;

      &--todos {
        width: 28px;
        height: 28px;
        padding-left: 2px;
        padding-right: 2px;
      }
    }
  }
</style>
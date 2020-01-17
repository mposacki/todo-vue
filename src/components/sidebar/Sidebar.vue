<template>
  <div class="sidebar" v-if="isAuth">
    <div class="sidebar__content">
      <SidebarNavigation />
    </div>
  </div>
</template>

<script>
import SidebarNavigation from "./SidebarNavigation";

export default {
    props: {
        isAuth: {
            type: Boolean,
            required: true
        }
    },
    components: {
        SidebarNavigation
    }
}
</script>

<style scoped lang="scss">
.sidebar {
  background: linear-gradient(0deg, rgba(255, 255, 255, .45), rgba(255, 255, 255, .45)), url("../../assets/light-beige-background.jpg");
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-right: 1px solid #ccc;

  &__content {
    padding: 10px;
  }
}
</style>
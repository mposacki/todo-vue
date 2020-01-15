<template>
  <div class="sidebar" v-if="isAuth">
    <UserIcon />
    <h1>Sidebar</h1>
  </div>
</template>

<script>
import UserIcon from "../user/UserIcon";

export default {
    props: {
        isAuth: {
            type: Boolean,
            required: true
        }
    },
    components: {
        UserIcon
    }
}
</script>

<style scoped lang="scss">
.sidebar {
  border-right: 1px solid #ccc;
}
</style>
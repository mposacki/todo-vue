<template>
  <div class="user-icon">
    <img :src="url" :alt="alt" class="user-icon__image" />
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: require("../../assets/user-man.svg")
    },
    alt: {
      type: String,
      default: "Some alt"
    }
  },
};
</script>

<style scoped lang="scss">
.user-icon {
  margin-right: auto;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
}
.user-icon__image {
  width: 40px;
  height: 40px;
}
</style>

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
      default: require("../../assets/user.svg")
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
  border-radius: 50%;
  border: 1px solid #000;
  background-color: $light-beige;

  display: flex;
  align-items: center;
  justify-content: center;
}
.user-icon__image {
  width: 28px;
  height: 28px;
}
</style>

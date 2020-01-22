<template>
  <div class="sign-in">
    <div class="sign-in__heading">Sign In!</div>
    <form @submit.prevent="onSubmit">
      <div class="input">
        <label for="email">E-mail address</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div class="input">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div class="submit">
        <button type="submit" class="btn btn__submit">Sign In</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("login", {
        email: formData.email,
        password: formData.password
      });
    }
  }
};
</script>

<style lang="scss">
.sign-in {
  width: 300px;
  margin: 0 auto;

  padding: 10px;

  &__heading {
    font-size: 26px;
    line-height: 1.2;
    font-weight: 700;
    text-align: center;
  }
}

.btn {
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

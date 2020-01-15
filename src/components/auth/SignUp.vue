<template>
  <div id="sign-up" class="sign-up">
    <div class="sign-up__heading">Sign Up!</div>
    <form @submit.prevent="onSubmit" class="sign-up-form">
      <div class="input" :class="{ invalid: $v.email.$error }">
        <label for="email">E-mail address</label>
        <input
          type="email"
          id="email"
          @blur="$v.email.$touch()"
          v-model="email"
        />
        <p class="sign-up__error" v-if="!$v.email.email">
          Please provide a valid email address.
        </p>
        <p class="sign-up__error" v-if="!$v.email.required && $v.email.$invalid && $v.email.$dirty">
          This field must not be empty.
        </p>
        <p class="sign-up__error" v-if="emailError !== ''">
          {{ emailError }}
        </p>
      </div>
      <div class="input" :class="{ invalid: $v.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          @blur="$v.password.$touch()"
          v-model="password"
        />
      </div>
      <div class="input" :class="{ invalid: $v.confirmPassword.$error }">
        <label for="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm-password"
          @blur="$v.confirmPassword.$touch()"
          v-model="confirmPassword"
        />
      </div>
      <div class="submit">
        <button type="submit" class="sign-up__submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      emailError: ""
    };
  },
  validations: {
    email: {
      required,
      email,
      unique: function(val) {
        let vm = this;
        if (val === "") return true;
        return axios
          .get('/users.json?orderBy="email"&equalTo="' + val + '"')
          .then(function(res){
            vm.emailError = Object.keys(res.data).length === 0 ? "" : "This email are existing. Please provide another email."
            return Object.keys(res.data).length === 0;
          });
      }
    },
    password: {
      required,
      minLen: minLength(6)
    },
    confirmPassword: {
      sameAs: sameAs(vm => {
        return vm.password;
      })
    }
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signup", formData);
    },
    emptyEmail($v) {
        console.log(!$v.email.required && $v.email.$invalid && $v.email.required.$dirty)
        return !$v.email.required && $v.email.$invalid && $v.email.required.$dirty
    }
  }
};
</script>

<style scoped lang="scss">
.sign-up {
  width: 300px;
  margin: 0 auto;

  padding: 10px;

  &__heading {
    font-size: 26px;
    line-height: 1.2;
    font-weight: 700;
    text-align: center;
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

  &__error {
    color: $red-light;
    font-size: 14px;
    line-height: 1.2;
  }
}
</style>

<style lang="scss">
.input {
  margin: 10px auto;

  & label {
    display: block;
    margin-bottom: 5px;
  }

  & input {
    font: inherit;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: $border-radius / 2;

    &:focus {
      outline: none;
      border: 1px solid darken(#ccc, 20%);
      background-color: darken($light, 5%);
    }
  }

  &.invalid {
    & input {
      border: 1px solid $red-light;
      border-radius: $border-radius / 2;
      background-color: $red-lighten;
    }

    & label {
      color: red;
    }
  }
}
</style>

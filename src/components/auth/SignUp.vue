<template>
  <div id="sign-up" class="sign-up">
    <div class="sign-up__heading">Sign Up!</div>
    <form @submit.prevent="onSubmit" class="sign-up-form">
      <div class="input" :class="{ invalid: $v.name.$error }">
        <label for="name">Name</label>
        <input
            type="text"
            id="name"
            @blur="$v.name.$touch()"
            v-model="name"
        />
      </div>
      <div class="input">
        <label for="sex">Sex</label>
        <select id="sex" v-model="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
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
        <button type="submit" class="btn btn__submit">Submit</button>
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
      emailError: "",
      name: "",
      sex: "male",
    };
  },
  validations: {
    name: {
      required,
      minLen: minLength(2)
    },
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
        name: this.name,
        sex: this.sex,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signup", formData);
    }
  }
};
</script>

<style lang="scss">
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

  &__error {
    color: $red-light;
    font-size: 14px;
    line-height: 1.2;
  }
}

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

  & select {
    font: inherit;
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: $border-radius / 2;
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
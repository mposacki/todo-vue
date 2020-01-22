<template>
  <div class="user-profile">
    <form @submit.prevent="updateUserProfile" class="user-profile-form">
      <div class="input" :class="{ invalid: $v.name.$error }">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          @blur="$v.name.$touch()"
          v-model="user.name"
        />
      </div>
      <div class="input">
        <label for="sex">Sex</label>
        <select id="sex" v-model="user.sex">
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
          v-model="user.email"
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
      <div class="submit">
        <button type="submit" class="btn btn__submit" @click="updateUserProfile">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
    import {required, email, minLength, sameAs} from "vuelidate/lib/validators";
    import axios from "axios";
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                emailError: ''
            }
        },
        computed: mapState({
            user: state => state.user
        }),
        validations: {
            name: {
                required,
                minLen: minLength(2)
            },
            email: {
                required,
                email,
                unique: function (val) {
                    let vm = this;
                    if (val === "") return true;
                    return axios
                        .get('/users.json?orderBy="email"&equalTo="' + val + '"')
                        .then(function (res) {
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
            updateUserProfile() {
                const formData = {
                    name: this.name,
                    sex: this.sex,
                    email: this.email,
                };
                this.$store.dispatch("updateUserProfile", formData);
            }
        }
    }
</script>

<style lang="scss">
  .user-profile {
    padding: 10px;
  }
</style>
<template>
  <div class="user-profile">
    <form @submit.prevent="updateUserProfile" class="user-profile-form">
      <div class="input" :class="{ invalid: $v.name.$error }">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          @blur="updateField('name', $event)"
          :value="name"
        />
        {{$v.name}}
      </div>
      <div class="input">
        <label for="sex">Sex</label>
        <select id="sex" :value="sex" @change="updateField('sex', $event)">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="input" :class="{ invalid: $v.email.$error }">
        <label for="email">E-mail address</label>
        <input
          type="email"
          id="email"
          @blur="updateField('email', $event)"
          :value="email"
        />
        {{$v.email}}
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
      {{getUserEmail}}
    </form>
  </div>
</template>

<script>
    import {required, email, minLength} from "vuelidate/lib/validators";
    import axios from "axios";
    import {mapState, mapGetters} from "vuex";

    export default {
        data() {
            return {
                emailError: '',
                tmpEmail: ''
            }
        },
        computed: {
            ...mapState({
                email: state => state.user.email,
                sex: state => state.user.sex,
                name: state => state.user.name,
            }),
            getUserEmail() {
                return this.tmpEmail = this.$store.state.user.email;
            }
        },
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
                            if (Object.keys(res.data).length === 0) {
                                vm.emailError = "";
                                return true;
                            }
                            vm.emailError = Object.values(res.data)[0].email === vm.tmpEmail ? "" : "This email are existing. Please provide another email.";
                            return Object.values(res.data)[0].email === vm.tmpEmail;
                        });
                }
            }
        },
        methods: {
            updateField(field, e) {
                console.log(field, e.target.value, this.tmpEmail);
                console.log(field === 'email', this.tmpEmail === e.target.value, field === 'email' && this.tmpEmail === e.target.value);
                // if ( field !== 'email' && this.userEmail !== e.target.value ) {
                this.$store.commit("updateField", {
                    fieldName: field,
                    value: e.target.value
                });
                // }
                this.$v[field].$touch();
            },
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

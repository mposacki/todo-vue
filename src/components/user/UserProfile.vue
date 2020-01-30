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
    </form>
  </div>
</template>

<script>
    import {required, email, minLength} from "vuelidate/lib/validators";
    import axios from "axios";
    import userAxios from "../../axios-auth";
    import {mapState} from "vuex";

    export default {
        data() {
            return {
                emailError: '',
                templateEmail: ''
            }
        },
        computed: {
            ...mapState({
                email: state => state.user.email,
                sex: state => state.user.sex,
                name: state => state.user.name
            }),
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
                    userAxios
                        .post("/accounts:lookup?key=AIzaSyDqDIUwP91okUZCVxo9DoTA4x8T5YHD3bc", {'idToken': vm.$store.state.idToken})
                        .then(res => {
                            for (let user of res.data.users) {
                                vm.templateEmail = user.email;
                            }
                        })
                        .catch(error => console.log(error));
                    if (val === "") return true;
                    return axios
                        .get('/users.json?orderBy="email"&equalTo="' + val + '"')
                        .then(function (res) {
                            if (Object.keys(res.data).length === 0) {
                                vm.emailError = "";
                                return true;
                            }
                            vm.emailError = Object.values(res.data)[0].email === vm.templateEmail ? "" : "This email are existing. Please provide another email.";
                            return Object.values(res.data)[0].email === vm.templateEmail;
                        });
                }
            }
        },
        methods: {
            updateField(field, e) {
                console.log(field, e.target.value, this.templateEmail);
                console.log((field !== 'email'), (this.templateEmail !== e.target.value), (field !== 'email') === (this.templateEmail !== e.target.value));
                // if ( (field !== 'email') === (this.templateEmail !== e.target.value) ) {
                //   console.log('Update fielda');
                this.$store.commit("updateField", {
                    fieldName: field,
                    value: e.target.value
                });
                // }
                if (field !== 'sex') this.$v[field].$touch();

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

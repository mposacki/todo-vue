<template>
  <div class="user">
    <img :src="[ sex === 'male' ? male : female ]" alt="User image" class="user__image"/>
    <p class="user__name" v-if="name">Hello {{ name }}</p>
  </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                female: require("../../assets/user-female.svg"),
                male: require("../../assets/user-male.svg")
            }
        },
        computed: mapState({
            name: state => state.user.name,
            sex: state => state.user.sex
        })
    };
</script>

<style lang="scss">
  .user {
    margin-right: auto;

    display: flex;
    align-items: center;
    justify-content: center;

    &__image {
      width: 40px;
      height: 40px;
    }

    &__name {
      color: $light;
      margin-bottom: 0;
      margin-left: 10px;
      font-weight: 500;
    }
  }
</style>

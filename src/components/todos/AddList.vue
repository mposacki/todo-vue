<template>
  <div>
    <h1>Create Todo List</h1>
    <div class="input" :class="{ invalid: $v.nameOfList.$error }">
        <label for="name">Name</label>
        <input
            type="text"
            id="name"
            @blur="$v.nameOfList.$touch()"
            v-model="nameOfList"
        />
      </div>
  </div>
</template>

<script>
  export default {
  }
</script>
<template>
  <form class="login-form" @submit.prevent="submit">
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
      <small id="emailHelp" class="form-text text-muted"
        >We'll never share your email with anyone else.</small
      >
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
      />
    </div>
    <div class="form-group form-check">
      <input type="checkbox" class="form-check-input" id="exampleCheck1" />
      <label class="form-check-label" for="exampleCheck1">Check me out</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data: () => ({
    user: null,
    email: null,
    password: null
  }),
  methods: {
    submit() {
      console.log(`submit!`);
      this.$emit("closeLoginForm");
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 500px;
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  // border: 1px solid gray;
}
</style>

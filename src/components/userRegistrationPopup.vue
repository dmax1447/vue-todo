<template>
  <form
    class="login-form p-3 shadow mb-5 bg-white rounded"
    @submit.prevent="registerUser"
  >
    <div class="form-group">
      <h3 class="mb-3">New user registration</h3>
      <label for="exampleInputEmail1">Email address</label>
      <input
        v-model="email"
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        v-model="password"
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        minlength="6"
      />
      <small id="emailHelp" class="form-text text-muted"
        >minimum length - 6 characters</small
      >
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
    registerUser() {
      // console.log(`submit!`);
      this.$store.dispatch("registerUser", {
        name: this.name,
        email: this.email,
        password: this.password
      });
      this.$emit("closeForm");
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

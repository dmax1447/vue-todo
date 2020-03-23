<template>
  <div id="app" class="container">
    <toast />
    <router-view />
  </div>
</template>

<script>
import toast from "./components/Toast.vue";

export default {
  name: "app",
  components: {
    toast
  }
};
</script>

<style lang="scss">
#app {
  margin-top: 2rem;
}
</style>

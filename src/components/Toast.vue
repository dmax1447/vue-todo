<template>
  <p v-if="isToastActive" class="my-toast">{{ getTostMessage }}</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "toast",
  computed: {
    ...mapGetters(["getTostMessage", "isToastActive"])
  }
};
</script>

<style scoped>
.my-toast {
  position: absolute;
  max-width: 50%;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  z-index: 100;
  padding: 0.5rem;
  border: 1px solid lightgray;
  border-radius: 5px;
  background: #fff;
  box-shadow: 5px 5px 5px 0 lightgray;
}
</style>

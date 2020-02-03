<template>
  <div>
    <h5>Task Card</h5>
    <h6>{{ task.description }}</h6>
    <p>start: {{ task.start }}</p>
    <p>duration: {{ task.duration }}</p>
    <p>state: {{ task.state }}</p>
    <p>complited: {{ task.complited }}</p>
    <p>priority: {{ task.priority }}</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {
    console.log(this.$route.params);
    this.id = this.$route.params.id;
    this.task = this.getTask(this.id);
  },
  data: () => ({
    task: [],
    id: ""
  }),
  computed: {
    ...mapGetters(["getTask"])
  }
};
</script>

<style></style>

<template>
  <div class="home">
    <task-list></task-list>
  </div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";

export default {
  name: "home",
  components: {
    TaskList
  },
  mounted() {
    this.$store.dispatch("loadTasks");
  }
};
</script>

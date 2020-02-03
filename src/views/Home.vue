<template>
  <div class="home">
    <controls></controls>
    <task-list :taskList="taskList"></task-list>
  </div>
</template>

<script>
import Controls from "@/components/Controls.vue";
import TaskList from "@/components/TaskList.vue";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    Controls,
    TaskList
  },
  mounted() {
    this.taskList = this.getTaskList;
  },
  data: () => ({
    taskList: []
  }),
  computed: {
    ...mapGetters(["getTaskList"])
  }
};
</script>

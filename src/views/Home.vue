<template>
  <div class="home">
    <controls></controls>
    <task-list :taskList="taskListMock"></task-list>
  </div>
</template>

<script>
import Controls from "@/components/Controls.vue";
import TaskList from "@/components/TaskList.vue";

export default {
  name: "home",
  components: {
    Controls,
    TaskList
  },
  data: () => ({
    taskListMock: [
      {
        description: "купить молока",
        start: "2019-05-15",
        duration: 10,
        state: "active",
        complited: false,
        priority: true
      },
      {
        description: "почистить картошку",
        start: "2019-06-02",
        duration: 3,
        state: "finished",
        complited: true,
        priority: true
      },
      {
        description: "накормить кота",
        start: "2019-06-29",
        duration: 5,
        state: "delayed",
        complited: false,
        priority: false
      }
    ]
  })
};
</script>

<template>
  <div>
    <table class="table mt-2">
      <thead class="thead-light">
        <tr class="text-left">
          <th>title</th>
          <th>description</th>
          <th>dueDate</th>
          <th>complited</th>
          <th class="text-left">tags</th>
          <th></th>
        </tr>
      </thead>
      <tr
        v-for="(task, index) in taskList"
        :key="index"
        :class="task.complited ? 'task-complited' : ''"
        class="text-left"
      >
        <td>{{ task.title }}</td>
        <td>
          <p class="task-descriprion-text">{{ task.description }}</p>
        </td>
        <td>{{ new Date(task.dueDate).toLocaleDateString() }}</td>
        <td>{{ task.complited }}</td>
        <td>{{ task.tags.join(", ") }}</td>
        <td>
          <router-link
            :to="`task/${task.id}`"
            tag="button"
            class="btn btn-sm btn-primary mr-2"
          >
            Open</router-link
          >
          <button class="btn btn-sm btn-danger" @click="deleteTask(task.id)">
            Delete
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: ["taskList"],
  methods: {
    deleteTask(id) {
      this.$store.dispatch("handleDeleteTask", id);
    }
  }
};
</script>

<style scoped lang="scss">
.task-descriprion-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 400px;
}
</style>

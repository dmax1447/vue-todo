<template>
  <div>
    <table class="table mt-2">
      <thead class="thead-light">
        <tr>
          <th>complited</th>
          <th>priority</th>
          <th class="text-left">description</th>
          <th>state</th>
          <th>start</th>
          <th>duration</th>
        </tr>
      </thead>
      <tr
        v-for="(task, index) in taskList"
        :key="index"
        :class="task.complited ? 'task-complited' : ''"
      >
        <td>{{ task.complited }}</td>
        <td>{{ task.priority }}</td>
        <router-link :to="{ name: 'task', params: { id: task.id } }">
          <td class="text-left">{{ task.description }}</td>
        </router-link>
        <td>{{ task.state }}</td>
        <td>{{ task.start }}</td>
        <td>{{ task.duration }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: ["taskList"]
};
</script>

<style></style>

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
        v-for="(taskItem, index) in taskList"
        :key="index"
        :class="taskItem.complited ? 'task-complited' : ''"
      >
        <td>{{ taskItem.complited }}</td>
        <td>{{ taskItem.priority }}</td>
        <td class="text-left">{{ taskItem.description }}</td>
        <td>{{ taskItem.state }}</td>
        <td>{{ taskItem.start }}</td>
        <td>{{ taskItem.duration }}</td>
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

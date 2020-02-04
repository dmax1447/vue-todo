<template>
  <div class="text-left">
    <h2>New Task:</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          v-model="task.title"
          type="text"
          class="form-control"
          id="title"
          required
        />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea
          v-model="task.description"
          class="form-control"
          id="description"
        />
      </div>
      <div class="form-group">
        <label for="date">Due date:</label>
        <input
          @change="handleDate"
          type="date"
          class="form-control"
          id="date"
          :value="dueDateFormatted"
          required
        />
      </div>
      <div class="form-group">
        <label for="tags">Tags (separate by space):</label>
        <input
          @change="handleTags"
          type="text"
          class="form-control"
          id="tahs"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary btn-sm">Add task</button>
    </form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "NewTask",
  data: () => ({
    task: {
      id: new Date().valueOf(),
      title: null,
      description: null,
      dueDate: null,
      tags: [],
      complited: false
    }
  }),
  computed: {
    dueDateFormatted() {
      return moment().add(1, "day").format("YYYY-MM-DD");
    }
  },
  methods: {
    handleDate(evt) {
      this.task.dueDate = new Date(evt.target.value).toISOString();
    },
    handleTags(evt) {
      this.task.tags = evt.target.value.split(" ");
    },
    handleSubmit() {
      this.$store.dispatch("handleTaskSubmit", this.task);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>

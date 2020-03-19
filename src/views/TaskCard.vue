<template>
  <div v-if="task" class="text-left">
    <h2>Update task:</h2>
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
          :value="dueDateFormatted"
          @change="handleDate"
          type="date"
          class="form-control"
          id="date"
        />
      </div>
      <div class="form-group">
        <label for="tags">Tags (separate by space):</label>
        <input
          :value="task.tags.join(' ')"
          @change="handleTags"
          type="text"
          class="form-control"
          id="tahs"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary btn-sm">Update</button>
    </form>
  </div>
  <div v-else>
    <h2>Task not found</h2>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  mounted() {
    this.task = this.getTask(this.$route.params.id);
  },
  data: () => ({
    task: null,
    id: ""
  }),
  computed: {
    ...mapGetters(["getTask"]),
    dueDateFormatted() {
      return moment(this.task.dueDate).format("YYYY-MM-DD");
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
      this.$store.dispatch("updateTask", this.task);
      this.$router.push("/");
    }
  }
};
</script>

<style></style>

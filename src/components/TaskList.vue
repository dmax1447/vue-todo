<template>
  <div>
    <user-registration-popup
      v-if="isRegistrationFormShown"
      @closeForm="isRegistrationFormShown = false"
    />
    <user-login-popup
      v-if="isLoginFormShown"
      @closeForm="isLoginFormShown = false"
    />
    <div class="input-group mb-3">
      <router-link to="/new" tag="button" :disabled="!isUserLogged" class="btn btn-sm btn-primary mr-1"
        >New task
      </router-link>
      <div class="input-group-prepend">
        <label class="input-group-text" for="inputGroupSelect01"
          >Filter status:</label
        >
      </div>
      <select
        class="custom-select mr-1"
        id="inputGroupSelect01"
        v-model="taskStatusFilter"
      >
        <option value="all" selected>All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="outdated">Outdated</option>
      </select>
      <button
        v-if="!isUserLogged"
        class="btn btn-sm btn-primary ml-2"
        @click="isRegistrationFormShown = !isRegistrationFormShown"
      >
        Register
      </button>
      <button
        v-if="!isUserLogged"
        class="btn btn-sm btn-primary ml-2"
        @click="isLoginFormShown = !isLoginFormShown"
      >
        Login
      </button>
      <button
        v-if="isUserLogged"
        class="btn btn-sm btn-primary ml-2"
        @click="logout"
      >
        Logout
      </button>
    </div>
    <table class="table mt-2" v-if="getTaskList.length > 0">
      <thead class="thead-light">
        <tr class="text-left">
          <th>v</th>
          <th>title</th>
          <th>description</th>
          <th>dueDate</th>
          <th class="text-left">tags</th>
          <th></th>
        </tr>
      </thead>
      <tr
        v-for="(task, index) in taskListFiltered"
        :key="index"
        class="text-left"
        :class="{
          'task-complited': task.complited,
          'task-outdated': new Date(task.dueDate).valueOf() < Date.now()
        }"
      >
        <td>
          <input
            type="checkbox"
            :checked="task.complited"
            @change="changeTaskStatus(task.id)"
          />
        </td>
        <td>{{ task.title }}</td>
        <td>
          <p class="task-descriprion-text">{{ task.description }}</p>
        </td>
        <td>{{ new Date(task.dueDate).toLocaleDateString() }}</td>
        <td>
          {{
            task.tags && typeof (task.tags === "Array")
              ? task.tags.join(" ")
              : typeof task.tags
          }}
        </td>
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
    <p v-if="isUserLogged && getTaskList.length === 0"> Task list is empty. Create some tasks!</p>
    <p v-if="!isUserLogged">Task list not availble, please login or register first!</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import userRegistrationPopup from "./userRegistrationPopup";
import userLoginPopup from "./userLoginPopup";

export default {
  name: "TaskList",
  components: {
    userRegistrationPopup,
    userLoginPopup
  },
  data: () => ({
    taskStatusFilter: "all",
    isLoginFormShown: false,
    isRegistrationFormShown: false
  }),
  computed: {
    ...mapGetters(["getTaskList", "isUserLogged"]),
    taskListFiltered() {
      return this.getTaskList.filter(item => {
        if (this.taskStatusFilter === "outdated") {
          return new Date(item.dueDate).valueOf() < Date.now();
        }

        if (this.taskStatusFilter === "completed") {
          return item.complited;
        }

        if (this.taskStatusFilter === "active") {
          return !item.complited;
        }
        return true;
      });
    }
  },
  methods: {
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    changeTaskStatus(id) {
      this.$store.dispatch("changeTaskStatus", id);
    },
    logout() {
      this.$store.dispatch("logout");
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

.task-complited {
  text-decoration: line-through;
  color: gray;
}

.task-outdated {
  color: red;
}
</style>

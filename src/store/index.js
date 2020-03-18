import Vue from "vue";
import Vuex from "vuex";
import user from "./user.js";
import toast from "./toast.js";
import * as fb from "firebase/app";
import "firebase/database";

class Task {
  constructor(task, owner) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.tags = task.tags;
    this.complited = task.complited;
    this.owner = owner;
  }
}

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    toast
  },
  state: {
    taskList: []
  },
  getters: {
    getTaskList: state => state.taskList,
    getTask: state => id => state.taskList.find(task => task.id === id)
  },
  mutations: {
    setTaskList(state, list) {
      state.taskList = list;
    },
    addTask(state, task) {
      state.taskList.push(task);
    },
    deleteTask(state, id) {
      const idx = state.taskList.findIndex(task => task.id === id);
      state.taskList.splice(idx, 1);
    },
    updateTask(state, task) {
      const idx = state.taskList.findIndex(item => item.id === task.id);
      state.taskList.splice(idx, 1, task);
    },
    changeStatus(state, id) {
      const idx = state.taskList.findIndex(task => task.id === id);
      state.taskList[idx].complited = !state.taskList[idx].complited;
    }
  },
  actions: {
    addTask({ commit, dispatch, getters }, payload) {
      const task = new Task(payload, getters.getUser);
      console.log(task);
      commit("addTask", task);
      // localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
      try {
        fb.database()
          .ref("tasks")
          .push(task);
      } catch {
        dispatch("showTost", "Error: task not created");
      }
    },
    updateTask({ commit }, task) {
      commit("updateTask", task);
      // localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    loadTasks({ commit, dispatch }) {
      // const storedTaskList = JSON.parse(
      //   localStorage.getItem("taskList") || "[]"
      // );

      try {
        fb.database()
          .ref("tasks")
          .once("value")
          .then(fbVal => {
            const taskList = fbVal.val();
            commit("setTaskList", Object.values(taskList));
          });
      } catch (error) {
        dispatch("showTost", `Error: ${error.message}`);
      }
    },
    handleDeleteTask({ commit }, id) {
      commit("deleteTask", id);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    changeTaskStatus({ commit }, id) {
      commit("changeStatus", id);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    }
  }
});

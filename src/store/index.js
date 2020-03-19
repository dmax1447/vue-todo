import Vue from "vue";
import Vuex from "vuex";
import user from "./user.js";
import toast from "./toast.js";
import * as fb from "firebase/app";
import "firebase/database";

class Task {
  constructor(task, owner, id = null) {
    if (id) {
      this.id = id;
    }
    this.title = task.title;
    this.description = task.description;
    this.dueDate = task.dueDate;
    this.tags = task.tags;
    this.complited = task.complited;
    this.owner = owner;
  }

  // static toRaw()
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
    getAllTaskList: state => state.taskList,
    getTaskList: state => state.taskList.filter(task => task.owner === state.user.user),
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
    },
    clearTaskList(state) {
      state.taskList = [];
    }
  },
  actions: {
    addTask({ commit, dispatch, getters }, payload) {
      const taskOwner = getters.getUser;
      const task = new Task(payload, taskOwner);
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
    updateTask({ commit, dispatch }, task) {
      commit("updateTask", task);
      try {
        fb.database()
          .ref("tasks")
          .child(task.id)
          .update({
            complited: task.complited,
            description: task.description,
            dueDate: task.dueDate,
            tags: task.tags,
            title: task.title
          })
          .then(response => {
            console.log("task updated, ", response);
          });
      } catch (error) {
        dispatch("showTost", `Error: ${error.message}`);
      }
      // localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    loadTasks({ commit, dispatch }) {
      // const storedTaskList = JSON.parse(
      //   localStorage.getItem("taskList") || "[]"
      // );
      dispatch("showTost", "loading tasks, please wait...");
      try {
        fb.database()
          .ref("tasks")
          .once("value")
          .then(fbVal => {
            const tasksRaw = fbVal.val();
            const taskIdList = Object.keys(tasksRaw);
            const taskList = [];
            taskIdList.forEach(id =>
              taskList.push(new Task(tasksRaw[id], tasksRaw[id].owner, id))
            );
            commit("setTaskList", taskList);
            dispatch("hideTost");
          });
      } catch (error) {
        dispatch("showTost", `Error: ${error.message}`);
      }
    },
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
      // localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    changeTaskStatus({ commit }, id) {
      commit("changeStatus", id);
      // localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    }
  }
});

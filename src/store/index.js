import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
      const idx = state.taskList.find(task => task.id === id);
      state.taskList.splice(idx, 1);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    updateTask(state, task) {
      const idx = state.taskList.find(item => item.id === task.id);
      state.taskList.splice(idx, 1, task);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    }
  },
  actions: {
    handleTaskSubmit({ commit }, task) {
      commit("addTask", task);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    handleTaskUpdate({ commit }, task) {
      commit("updateTask", task);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    },
    loadApp({ commit }) {
      const storedTaskList = JSON.parse(
        localStorage.getItem("taskList") || "[]"
      );
      commit("setTaskList", storedTaskList);
    },
    handleDeleteTask({ commit }, id) {
      commit("deleteTask", id);
      localStorage.setItem("taskList", JSON.stringify(this.state.taskList));
    }
  },
  modules: {}
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskListMock: [
      {
        id: "0001",
        description: "купить молока ",
        start: "2019-05-15",
        duration: 10,
        state: "active",
        complited: false,
        priority: true
      },
      {
        id: "0002",
        description: "почистить картошку",
        start: "2019-06-02",
        duration: 3,
        state: "finished",
        complited: true,
        priority: true
      },
      {
        id: "0003",
        description: "накормить кота",
        start: "2019-06-29",
        duration: 5,
        state: "delayed",
        complited: false,
        priority: false
      }
    ]
  },
  getters: {
    getTaskList: state => state.taskListMock,
    getTask: state => id => state.taskListMock.find(task => task.id === id)
  },
  mutations: {},
  actions: {},
  modules: {}
});

export default {
  state: {
    tostMessage: "",
    tostActive: false
  },
  getters: {
    getTostMessage: state => state.tostMessage,
    isToastActive: state => state.tostActive
  },
  mutations: {
    setTostMessage(state, message) {
      state.tostMessage = message;
    },
    setTostActive(state, tostState) {
      state.tostActive = tostState;
    }
  },
  actions: {
    showTost({ commit }, message) {
      commit("setTostMessage", message);
      commit("setTostActive", true);
      setTimeout(() => {
        commit("setTostActive", false);
      }, 5000);
    }
  }
};

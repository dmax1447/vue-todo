import * as fb from "firebase";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    registerUser({ commit }, { email, password }) {
      fb.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          const uid = response.user.uid;
          commit("setUser", new User(uid));
        });
    }
  }
};

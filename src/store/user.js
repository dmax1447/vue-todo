// import * as fb from "firebase";

import fb from "firebase/app";
import "firebase/auth";

class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
    userLogged: false
  },
  getters: {
    getUser: state => state.user,
    isUserLogged: state => state.userLogged
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserLogged(state, userLoggedStatus) {
      state.userLogged = userLoggedStatus;
    }
  },
  actions: {
    registerUser({ commit, dispatch }, { email, password }) {
      fb.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          console.log(response);
          const uid = response.user.uid;
          commit("setUser", new User(uid));
          commit("setUserLogged", true);
          dispatch("showTost", "user created successfully");
        });
    },
    loginUser({ commit, dispatch }, { email, password }) {
      if (fb.auth().currentUser) {
        fb.auth().signOut();
      } else {
        fb.auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            dispatch("showTost", "user logged in successfully");
            commit("setUserLogged", true);
          })
          .catch(error => {
            if (error.code === "auth/wrong-password") {
              dispatch("showTost", "Wrong password");
            } else {
              dispatch("showTost", `error in auth: ${error.message}`);
            }
            console.log(error);
          });
      }
    },
    autoLoginUser({ commit }, userId) {
      commit("setUser", userId);
      commit("setUserLogged", true);
    },
    logout({ commit }) {
      commit("setUser", null);
      commit("setUserLogged", false);
      fb.auth().signOut();
    }
  }
};
